"""Process cover image (PIL-only):
1. Detect sky/architecture horizon
2. Crop so horizon lands at 50% of a 16:9 frame
3. Resize to 1920x1080
4. Save webp q=80 + jpg q=85 fallback
"""
from PIL import Image, ImageStat
import os

SRC = r"D:/Project2/code-260701-公司官网/easyzai_officail_website-github/easyzai_official_website/docs/fde/assets/cover-raw.jpg"
DST_WEBP = r"D:/Project2/code-260701-公司官网/easyzai_officail_website-github/easyzai_official_website/docs/fde/assets/cover.webp"
DST_JPG = r"D:/Project2/code-260701-公司官网/easyzai_officail_website-github/easyzai_official_website/docs/fde/assets/cover.jpg"

img = Image.open(SRC).convert("RGB")
W, H = img.size
print(f"original: {W}x{H}")

# Detect horizon: scan rows, find biggest luminance jump
gray = img.convert("L")
prev_mean = None
horizon = 0
max_diff = 0
step = 4  # sample every 4 rows for speed
for y in range(0, H, step):
    row = gray.crop((0, y, W, y + 1))
    m = ImageStat.Stat(row).mean[0]
    if prev_mean is not None:
        d = abs(m - prev_mean)
        if d > max_diff:
            max_diff = d
            horizon = y
    prev_mean = m
print(f"detected horizon row: {horizon} ({horizon/H*100:.1f}% from top), jump={max_diff:.1f}")

# Build a 16:9 window with horizon centered
target_ratio = 16 / 9
h_max_by_w = int(W / target_ratio)
h = min(h_max_by_w, H)
top = horizon - h // 2
if top < 0:
    top = 0
if top + h > H:
    top = H - h
w = int(h * target_ratio)
if w > W:
    w = W
left = (W - w) // 2
bottom = top + h
right = left + w
print(f"crop window: ({left},{top}) to ({right},{bottom}), size={w}x{h}")

cropped = img.crop((left, top, right, bottom))
final = cropped.resize((1920, 1080), Image.LANCZOS)

# Verify horizon is now at center
# Re-detect in cropped
gray2 = final.convert("L")
prev = None
new_horizon = 0
maxd = 0
for y in range(0, 1080, 2):
    row = gray2.crop((0, y, 1920, y + 1))
    m = ImageStat.Stat(row).mean[0]
    if prev is not None:
        d = abs(m - prev)
        if d > maxd:
            maxd = d
            new_horizon = y
    prev = m
print(f"final horizon: {new_horizon} ({new_horizon/1080*100:.1f}% from top)")

final.save(DST_WEBP, "WEBP", quality=80, method=6)
print(f"webp: {os.path.getsize(DST_WEBP) / 1024:.1f} KB")

final.save(DST_JPG, "JPEG", quality=85, optimize=True, progressive=True)
print(f"jpg:  {os.path.getsize(DST_JPG) / 1024:.1f} KB")
