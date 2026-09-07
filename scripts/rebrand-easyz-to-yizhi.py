#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
品牌重命名：EasyZ -> 易智AI
- 跳过工商英文名 "Shenyang EasyZ Software Information Technology Service Co., Ltd."
- 跳过域名 easyzai.top / 路径 / package.json#name / 仓库名
- 跳过公司中文名 "沈阳易智软件信息技术服务有限公司"（已经是"易智"了，无 EasyZ 也不动）
"""
import os
import re
import sys

ROOT = r"D:\Project2\code-260701-公司官网\easyzai_officail_website-github\easyzai_official_website"

# 通用规则（按从长到短顺序匹配，避免误伤）
COMMON_RULES = [
    # 中文长串
    ("EasyZ FDE 方法论", "易智AI FDE 方法论"),
    ("EasyZ 微信二维码", "易智AI 微信二维码"),
    ("EasyZ AI，研究型团队", "易智AI，研究型团队"),
    ("EasyZ Specimen No. 01", "易智AI Specimen No. 01"),
    ("EasyZ 研究型团队，", "易智AI 研究型团队，"),
    ("EasyZ 是一支小型研究型团队", "易智AI 是一支小型研究型团队"),
    ("EasyZ 的能力图谱与代表案例", "易智AI 的能力图谱与代表案例"),
    ("EasyZ 易智", "易智AI"),
    ("关于 · EasyZ", "关于 · 易智AI"),
    ("实践 · EasyZ", "实践 · 易智AI"),
    ("加入我们 · EasyZ", "加入我们 · 易智AI"),
    # 英文长串
    ("EasyZ AI, research-driven team", "易智AI, research-driven team"),
    ("Cyanotype plant specimen — EasyZ", "Cyanotype plant specimen — 易智AI"),
    ("About · EasyZ", "About · 易智AI"),
    ("Practice · EasyZ", "Practice · 易智AI"),
    ("Join us · EasyZ", "Join us · 易智AI"),
    ("EasyZ, a research-driven team,", "易智AI, a research-driven team,"),
    ("EasyZ is a small research-driven team", "易智AI is a small research-driven team"),
    ("EasyZ's capability map", "易智AI's capability map"),
    # 短串（带上下文）
    ("EasyZ WeChat QR", "易智AI WeChat QR"),
    ("EASYZ AI", "易智AI"),
    ("404 · EasyZ AI", "404 · 易智AI"),
    # src/lib/structured-data.ts 的 alternateName 用 'EasyZ' 字符串
    ("alternateName: 'EasyZ'", "alternateName: '易智AI'"),
    # manifest.ts
    ("name: 'EasyZ 易智'", "name: '易智AI'"),
    ("short_name: 'EasyZ'", "short_name: '易智AI'"),
    # structured-data.ts 顶层 name
    ("name: 'EasyZ 易智',", "name: '易智AI',"),
    # Navbar aria-label 与 alt
    ('aria-label="EasyZ"', 'aria-label="易智AI"'),
    ('alt="EasyZ"', 'alt="易智AI"'),
]

# 文档标题（README / AGENTS / DEPLOY）单独处理
DOC_TITLE_RULES = [
    ("# EasyZ 官网项目", "# 易智AI 官网项目"),
    ("# AGENTS.md — EasyZ 官网项目笔记", "# AGENTS.md — 易智AI 官网项目笔记"),
    ("# EasyZ 官网部署指南", "# 易智AI 官网部署指南"),
    # README 描述行
    ("**易智（EasyZ）** 是 AI 落地集成服务商", "**易智AI** 是 AI 落地集成服务商"),
    ("**易智（EasyZ）** 是 AI 落地集成服务商", "**易智AI** 是 AI 落地集成服务商"),
]

# en.json keywords 末尾的 ", EasyZ" 去掉
EN_KEYWORDS_FIX = [
    ("LLM applications, EasyZ", "LLM applications"),
]

# 跳过规则：包含此字符串的行不做任何替换
SKIP_LINE_CONTAINS = [
    "Shenyang EasyZ Software",  # 工商英文名
    "easyzai",                  # 域名 / 路径 / 仓库名
    "easyz-official-website",   # package.json name
    "https://easyzai.top",
    "http://easyzai.top",
    "www.easyzai.top",
    "easyzai-website.tar.gz",
    "/var/www/easyzai",
    "easyzai_official_website",
    "easyz_", "easyz-",
    "EASYZ_SOFTWARE", "easyz_software",
]


def should_skip_line(line: str) -> bool:
    for token in SKIP_LINE_CONTAINS:
        if token in line:
            return True
    return False


def apply_rules(text: str, rules):
    new_text = text
    applied = []
    for old, new in rules:
        if old in new_text:
            count = new_text.count(old)
            new_text = new_text.replace(old, new)
            applied.append((old, new, count))
    return new_text, applied


def process_file(path: str, rules, extra_rules=None):
    with open(path, "r", encoding="utf-8") as f:
        original = f.read()

    new_lines = []
    all_applied = []
    for line in original.splitlines(keepends=True):
        if should_skip_line(line):
            new_lines.append(line)
            continue
        new_line, applied = apply_rules(line, rules)
        if extra_rules:
            new_line, applied2 = apply_rules(new_line, extra_rules)
            applied.extend(applied2)
        new_lines.append(new_line)
        all_applied.extend(applied)

    new_text = "".join(new_lines)
    if new_text != original:
        with open(path, "w", encoding="utf-8") as f:
            f.write(new_text)
    return new_text != original, all_applied


def main():
    targets = [
        # i18n
        (os.path.join(ROOT, "messages", "zh.json"), COMMON_RULES),
        (os.path.join(ROOT, "messages", "en.json"), COMMON_RULES + EN_KEYWORDS_FIX),
        # src
        (os.path.join(ROOT, "src", "app", "manifest.ts"), COMMON_RULES),
        (os.path.join(ROOT, "src", "app", "not-found.tsx"), COMMON_RULES),
        (os.path.join(ROOT, "src", "components", "Navbar.tsx"), COMMON_RULES),
        (os.path.join(ROOT, "src", "lib", "structured-data.ts"), COMMON_RULES),
        (os.path.join(
            ROOT, "src", "app", "[locale]", "thinking", "[slug]", "ThinkingDetailContent.tsx"
        ), COMMON_RULES + [("EasyZ FDE 方法论", "易智AI FDE 方法论")]),
        # docs
        (os.path.join(ROOT, "README.md"), DOC_TITLE_RULES + COMMON_RULES),
        (os.path.join(ROOT, "AGENTS.md"), DOC_TITLE_RULES + COMMON_RULES),
        (os.path.join(ROOT, "DEPLOY.md"), DOC_TITLE_RULES + COMMON_RULES),
    ]

    total_changed_files = 0
    for path, rules in targets:
        if not os.path.exists(path):
            print(f"  [SKIP] not found: {path}")
            continue
        changed, applied = process_file(path, rules)
        if changed:
            total_changed_files += 1
            print(f"  [OK]   {os.path.relpath(path, ROOT)}  ({len(applied)} replacements)")
            for old, new, n in applied:
                print(f"          - {old!r} -> {new!r}  ×{n}")
        else:
            print(f"  [--]   {os.path.relpath(path, ROOT)}  (no change)")

    print(f"\nChanged files: {total_changed_files}/{len(targets)}")


if __name__ == "__main__":
    main()
