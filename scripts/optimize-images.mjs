// 一次性图片优化脚本：大图 → 多尺寸 WebP
// 用法: node scripts/optimize-images.mjs
// 注意: 部分 .png 实为 JPEG 内容（iPhone 导出改后缀），sharp 按内容识别，无需特殊处理
import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'

const OUT = 'public/assets'
const Q = 82 // WebP 质量：照片类清晰度/体积平衡点

const jobs = [
  // thinking 详情页 hero（全宽 object-cover，桌面 1920 + 移动 1080）
  { src: 'thinking-case-study.png', outs: [[1920, 'thinking-case-study-1920.webp'], [1080, 'thinking-case-study-1080.webp']] },
  { src: 'thinking-arch.png',       outs: [[1920, 'thinking-arch-1920.webp'],       [1080, 'thinking-arch-1080.webp']] },
  // 竖图，源文件已小，单张即可
  { src: 'thinking-securities.jpg', outs: [[1080, 'thinking-securities-1080.webp']] },
  // 首页 specimen：背景 bleed 用 1920，340px 卡片用 680（340×2 retina）
  { src: 'concept-cyanotype-3.png', outs: [[1920, 'concept-cyanotype-1920.webp'], [680, 'concept-cyanotype-680.webp']] },
  // Footer 全宽背景（装饰性，单张）
  { src: 'footer-bg.png',           outs: [[1920, 'footer-bg-1920.webp']] },
  // 纹理背景（装饰性，无需高分辨率）
  { src: 'marble-texture.png',      outs: [[1200, 'marble-texture-1200.webp']] },
  // join 页 hero（全宽）
  { src: 'joinus.jpg',              outs: [[1920, 'joinus-1920.webp'], [1080, 'joinus-1080.webp']] },
]

await mkdir(OUT, { recursive: true })

for (const job of jobs) {
  const srcPath = `${OUT}/${job.src}`
  for (const [width, name] of job.outs) {
    const img = sharp(srcPath).rotate().resize({ width, withoutEnlargement: true })
    const info = await img.webp({ quality: Q }).toFile(`${OUT}/${name}`)
    console.log(`${name.padEnd(36)} ${(info.size / 1024).toFixed(0).padStart(5)} KB  ${info.width}x${info.height}`)
  }
}
console.log('DONE')
