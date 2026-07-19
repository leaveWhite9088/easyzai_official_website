import { Fragment, type ReactNode } from 'react'

// Lightweight, dependency-free syntax highlighter for the fixed demo snippets.
// Token colors live in globals.css (.tok-*) as CSS variables, so they flip with
// html[data-theme] — no JS theme reading, no hydration mismatch, no re-render.
const KEYWORDS = new Set([
  'def', 'return', 'if', 'else', 'elif', 'for', 'in', 'import', 'from', 'class',
  'func', 'let', 'var', 'while', 'match', 'case',
])

// One combined tokenizer pass. Order matters: comments/strings first.
const TOKEN_RE =
  /(#[^\n]*|\/\/[^\n]*)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|(\b\d+(?:\.\d+)?\b)|([A-Za-z_][A-Za-z0-9_]*)|(\s+)|([^\sA-Za-z0-9_])/g

type TokKind = 'keyword' | 'type' | 'string' | 'number' | 'func' | 'comment' | 'punct' | 'base'

export function highlight(line: string, lang: 'python' | 'cangjie'): ReactNode {
  const out: ReactNode[] = []
  let m: RegExpExecArray | null
  let key = 0
  TOKEN_RE.lastIndex = 0
  let last = 0

  while ((m = TOKEN_RE.exec(line)) !== null) {
    // Guard against zero-length matches
    if (m.index < last) continue
    last = TOKEN_RE.lastIndex

    const [full, comment, str, num, ident, space, punct] = m
    if (space !== undefined) {
      out.push(<Fragment key={key++}>{space}</Fragment>)
      continue
    }
    let kind: TokKind = 'base'
    if (comment !== undefined) kind = 'comment'
    else if (str !== undefined) kind = 'string'
    else if (num !== undefined) kind = 'number'
    else if (ident !== undefined) {
      if (KEYWORDS.has(ident)) kind = 'keyword'
      else if (/^[A-Z]/.test(ident)) kind = 'type'
      else {
        // function call if followed by "("
        const after = line.slice(m.index + full.length)
        kind = /^\s*\(/.test(after) ? 'func' : 'base'
      }
    } else if (punct !== undefined) kind = 'punct'

    out.push(
      <span key={key++} className={`tok-${kind}`}>
        {full}
      </span>
    )
  }
  return out
}
