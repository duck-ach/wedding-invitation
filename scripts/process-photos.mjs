import sharp from "sharp";
import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";

const SRC_DIR = "C:/Users/precursor/Desktop/0_사진";
const OUT_DIR = path.resolve("public/images/gallery");
const HERO_OUT = path.resolve("public/images/hero.jpg");
const HERO_FILE = "KakaoTalk_20260908_131035789_07.jpg";

const FULL_MAX = 1920;
const THUMB_MAX = 640;

async function processOne(srcPath, outFullPath, outThumbPath) {
  const image = sharp(srcPath).rotate(); // auto-orient from EXIF
  const meta = await image.metadata();

  await image
    .clone()
    .resize({ width: FULL_MAX, height: FULL_MAX, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile(outFullPath);

  await image
    .clone()
    .resize({ width: THUMB_MAX, height: THUMB_MAX, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 78, mozjpeg: true })
    .toFile(outThumbPath);

  return meta;
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const files = (await readdir(SRC_DIR)).filter((f) => f.toLowerCase().endsWith(".jpg"));
  const galleryFiles = files.filter((f) => f !== HERO_FILE).sort();

  console.log(`Hero: ${HERO_FILE}`);
  const heroMeta = await sharp(path.join(SRC_DIR, HERO_FILE))
    .rotate()
    .resize({ width: FULL_MAX, height: FULL_MAX, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile(HERO_OUT);
  console.log(`  -> public/images/hero.jpg (${heroMeta.width}x${heroMeta.height})`);

  console.log(`\nGallery photos (${galleryFiles.length}):`);
  const results = [];
  for (let i = 0; i < galleryFiles.length; i++) {
    const file = galleryFiles[i];
    const id = `g${String(i + 1).padStart(2, "0")}`;
    const fullOut = path.join(OUT_DIR, `${id}-full.jpg`);
    const thumbOut = path.join(OUT_DIR, `${id}-thumb.jpg`);
    const srcMeta = await sharp(path.join(SRC_DIR, file)).metadata();
    await processOne(path.join(SRC_DIR, file), fullOut, thumbOut);
    const outMeta = await sharp(fullOut).metadata();
    console.log(
      `  ${id}: ${file} (${srcMeta.width}x${srcMeta.height}) -> ${outMeta.width}x${outMeta.height}`
    );
    results.push({ id, file, width: outMeta.width, height: outMeta.height });
  }

  console.log("\nJSON manifest:");
  console.log(JSON.stringify(results, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
