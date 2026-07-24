// One-off image compression: original user-supplied stock-screen photo
// → web-optimized JPG for the case-study thinking detail concept image.
// No resize (let CSS object-cover crop 16:9 from 4:3 source).
const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const SRC = path.join('art', 'input', 'user-stock-screen.jpg')
const DEST = path.join('public', 'assets', 'thinking-securities.jpg')

async function main() {
  const before = await sharp(SRC).metadata()
  const srcBytes = fs.statSync(SRC).size
  console.log(`Source: ${before.width}x${before.height} ${before.format} ${srcBytes} bytes`)

  await sharp(SRC)
    .jpeg({ quality: 78, progressive: true, mozjpeg: false })
    .toFile(DEST)

  const after = await sharp(DEST).metadata()
  const outBytes = fs.statSync(DEST).size
  const ratio = ((1 - outBytes / srcBytes) * 100).toFixed(1)
  console.log(`Output: ${after.width}x${after.height} jpeg ${outBytes} bytes`)
  console.log(`Compression: ${srcBytes} → ${outBytes} bytes (-${ratio}%)`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
