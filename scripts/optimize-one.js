const sharp = require('sharp');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

// Configuration (aligned with scripts/optimize-images.js)
const config = {
  quality: 80, // JPEG quality (0-100)
  pngQuality: 80, // PNG quality (0-100)
  webpQuality: 80, // WebP quality (0-100)
  maxWidth: 1920, // Maximum width for images
  maxHeight: 1080, // Maximum height for images
  formats: ['webp', 'original'], // Generate WebP and keep optimized original
};

const supportedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];

function getFileSizeInMB(filePath) {
  const stats = fs.statSync(filePath);
  return (stats.size / (1024 * 1024)).toFixed(2);
}

async function optimizeImage(inputPath, outputDir) {
  const filename = path.basename(inputPath);
  const nameWithoutExt = path.parse(filename).name;
  const ext = path.parse(filename).ext.toLowerCase();

  if (!supportedExtensions.includes(ext)) {
    throw new Error(`Unsupported format: ${ext}`);
  }

  const originalSize = getFileSizeInMB(inputPath);

  const image = sharp(inputPath);
  const metadata = await image.metadata();

  let processedImage = image;
  if (metadata.width > config.maxWidth || metadata.height > config.maxHeight) {
    processedImage = image.resize(config.maxWidth, config.maxHeight, {
      fit: 'inside',
      withoutEnlargement: true
    });
  }

  const results = {};

  // Ensure output directory exists
  await fsPromises.mkdir(outputDir, { recursive: true });

  // WebP
  if (config.formats.includes('webp')) {
    const webpPath = path.join(outputDir, `${nameWithoutExt}.webp`);
    await processedImage.webp({ quality: config.webpQuality }).toFile(webpPath);
    results.webpPath = webpPath;
    results.webpSize = getFileSizeInMB(webpPath);
  }

  // Optimized original
  const optimizedPath = path.join(outputDir, `optimized-${filename}`);
  if (ext === '.jpg' || ext === '.jpeg') {
    await processedImage.jpeg({ quality: config.quality, progressive: true }).toFile(optimizedPath);
  } else if (ext === '.png') {
    await processedImage.png({ quality: config.pngQuality, compressionLevel: 9 }).toFile(optimizedPath);
  } else {
    await processedImage.toFile(optimizedPath);
  }
  results.optimizedPath = optimizedPath;
  results.optimizedSize = getFileSizeInMB(optimizedPath);

  results.originalSize = originalSize;
  return results;
}

async function main() {
  const arg = process.argv[2];
  if (!arg) {
    console.error('Usage: node scripts/optimize-one.js <relative-or-absolute-image-path>');
    process.exit(1);
  }

  const publicDir = path.join(__dirname, '..', 'public');
  let inputPath = arg;
  if (!path.isAbsolute(inputPath)) {
    // If a bare filename or public-relative path is provided, resolve from public dir
    inputPath = path.join(publicDir, arg);
  }

  if (!fs.existsSync(inputPath)) {
    console.error(`Input file not found: ${inputPath}`);
    process.exit(1);
  }

  const outputDir = path.join(publicDir, 'optimized');

  console.log(`Optimizing: ${path.relative(publicDir, inputPath)}`);
  try {
    const res = await optimizeImage(inputPath, outputDir);
    console.log('Done.');
    console.log(`Original size: ${res.originalSize}MB`);
    if (res.webpPath) console.log(`WebP: ${path.relative(publicDir, res.webpPath)} (${res.webpSize}MB)`);
    console.log(`Optimized original: ${path.relative(publicDir, res.optimizedPath)} (${res.optimizedSize}MB)`);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

main();


