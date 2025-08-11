const sharp = require('sharp');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

// Configuration
const config = {
  quality: 80, // JPEG quality (0-100)
  pngQuality: 80, // PNG quality (0-100)
  webpQuality: 80, // WebP quality (0-100)
  maxWidth: 1920, // Maximum width for images
  maxHeight: 1080, // Maximum height for images
  formats: ['webp', 'original'], // Generate WebP and keep original
};

// Supported image extensions
const supportedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];

// Function to get file size in MB
function getFileSizeInMB(filePath) {
  const stats = fs.statSync(filePath);
  return (stats.size / (1024 * 1024)).toFixed(2);
}

// Function to optimize a single image
async function optimizeImage(inputPath, outputDir) {
  try {
    const filename = path.basename(inputPath);
    const nameWithoutExt = path.parse(filename).name;
    const ext = path.parse(filename).ext.toLowerCase();

    if (!supportedExtensions.includes(ext)) {
      console.log(`Skipping ${filename} - unsupported format`);
      return;
    }

    console.log(`\nProcessing: ${filename}`);
    const originalSize = getFileSizeInMB(inputPath);
    console.log(`Original size: ${originalSize}MB`);

    // Read the image
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    // Resize if needed
    let processedImage = image;
    if (metadata.width > config.maxWidth || metadata.height > config.maxHeight) {
      processedImage = image.resize(config.maxWidth, config.maxHeight, {
        fit: 'inside',
        withoutEnlargement: true
      });
      console.log(`Resized from ${metadata.width}x${metadata.height} to fit within ${config.maxWidth}x${config.maxHeight}`);
    }

    // Generate optimized versions
    const optimizations = [];

    // WebP version
    if (config.formats.includes('webp')) {
      const webpPath = path.join(outputDir, `${nameWithoutExt}.webp`);
      await processedImage
        .webp({ quality: config.webpQuality })
        .toFile(webpPath);

      const webpSize = getFileSizeInMB(webpPath);
      optimizations.push({ format: 'WebP', size: webpSize, path: webpPath });
      console.log(`Generated WebP: ${webpSize}MB`);
    }

    // Optimized original format
    const optimizedPath = path.join(outputDir, `optimized-${filename}`);
    if (ext === '.jpg' || ext === '.jpeg') {
      await processedImage
        .jpeg({ quality: config.quality, progressive: true })
        .toFile(optimizedPath);
    } else if (ext === '.png') {
      await processedImage
        .png({ quality: config.pngQuality, compressionLevel: 9 })
        .toFile(optimizedPath);
    } else {
      await processedImage.toFile(optimizedPath);
    }

    const optimizedSize = getFileSizeInMB(optimizedPath);
    optimizations.push({ format: 'Optimized', size: optimizedSize, path: optimizedPath });
    console.log(`Generated optimized ${ext}: ${optimizedSize}MB`);

    // Calculate savings
    const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
    console.log(`Size reduction: ${savings}%`);

    return optimizations;

  } catch (error) {
    console.error(`Error processing ${inputPath}:`, error.message);
    return null;
  }
}

// Function to recursively find all images in a directory
async function findImages(dir) {
  const images = [];

  try {
    const items = await fs.readdir(dir, { withFileTypes: true });

    for (const item of items) {
      const fullPath = path.join(dir, item.name);

      if (item.isDirectory()) {
        const subImages = await findImages(fullPath);
        images.push(...subImages);
      } else if (item.isFile()) {
        const ext = path.extname(item.name).toLowerCase();
        if (supportedExtensions.includes(ext)) {
          images.push(fullPath);
        }
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error.message);
  }

  return images;
}

// Main function
async function optimizeAllImages() {
  console.log('🚀 Starting image optimization...\n');

  const publicDir = path.join(__dirname, '..', 'public');
  const outputDir = path.join(publicDir, 'optimized');

  // Create output directory if it doesn't exist
  try {
    await fs.mkdir(outputDir, { recursive: true });
  } catch (error) {
    console.error('Error creating output directory:', error.message);
    return;
  }

  // Find all images
  console.log('📁 Scanning for images...');
  const images = await findImages(publicDir);

  if (images.length === 0) {
    console.log('No images found to optimize.');
    return;
  }

  console.log(`Found ${images.length} images to process:\n`);
  images.forEach(img => console.log(`  - ${path.relative(publicDir, img)}`));

  // Process each image
  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;
  let processedCount = 0;

  for (const imagePath of images) {
    const originalSize = parseFloat(getFileSizeInMB(imagePath));
    totalOriginalSize += originalSize;

    const optimizations = await optimizeImage(imagePath, outputDir);

    if (optimizations) {
      processedCount++;
      // Use the smallest optimized version for total calculation
      const smallestOptimization = optimizations.reduce((min, opt) =>
        parseFloat(opt.size) < parseFloat(min.size) ? opt : min
      );
      totalOptimizedSize += parseFloat(smallestOptimization.size);
    }
  }

  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 OPTIMIZATION SUMMARY');
  console.log('='.repeat(50));
  console.log(`Processed: ${processedCount}/${images.length} images`);
  console.log(`Total original size: ${totalOriginalSize.toFixed(2)}MB`);
  console.log(`Total optimized size: ${totalOptimizedSize.toFixed(2)}MB`);
  console.log(`Total savings: ${((totalOriginalSize - totalOptimizedSize) / totalOriginalSize * 100).toFixed(1)}%`);
  console.log(`\nOptimized images saved to: ${outputDir}`);
  console.log('\n💡 Next steps:');
  console.log('1. Review the optimized images in the output directory');
  console.log('2. Replace original images with optimized versions if satisfied');
  console.log('3. Update image paths in your code to use optimized versions');
  console.log('4. Consider implementing automatic optimization in your build process');
}

// Run the script
optimizeAllImages().catch(console.error);
