const sharp = require('sharp');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

// Configuration for build process
const config = {
  quality: 85, // JPEG quality (0-100)
  pngQuality: 85, // PNG quality (0-100)
  webpQuality: 85, // WebP quality (0-100)
  maxWidth: 1920, // Maximum width for images
  maxHeight: 1080, // Maximum height for images
  formats: ['webp'], // Only generate WebP for build (smaller, modern format)
  replaceOriginals: false, // Don't replace originals during build
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
      return null;
    }

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
    }

    // Generate WebP version (most efficient for web)
    const webpPath = path.join(outputDir, `${nameWithoutExt}.webp`);
    await processedImage
      .webp({ quality: config.webpQuality })
      .toFile(webpPath);

    const webpSize = getFileSizeInMB(webpPath);
    const originalSize = getFileSizeInMB(inputPath);
    const savings = ((originalSize - webpSize) / originalSize * 100).toFixed(1);

    return {
      original: inputPath,
      optimized: webpPath,
      originalSize,
      optimizedSize: webpSize,
      savings: parseFloat(savings)
    };

  } catch (error) {
    console.error(`Error processing ${inputPath}:`, error.message);
    return null;
  }
}

// Function to recursively find all images in a directory
async function findImages(dir) {
  const images = [];

  try {
    const items = await fsPromises.readdir(dir, { withFileTypes: true });

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

// Main function for build process
async function optimizeImagesForBuild() {
  console.log('🖼️  Optimizing images for build...');

  const publicDir = path.join(__dirname, '..', 'public');
  const outputDir = path.join(publicDir, 'optimized');

  // Create output directory if it doesn't exist
  try {
    await fsPromises.mkdir(outputDir, { recursive: true });
  } catch (error) {
    console.error('Error creating output directory:', error.message);
    return;
  }

  // Find all images
  const images = await findImages(publicDir);

  if (images.length === 0) {
    console.log('No images found to optimize.');
    return;
  }

  console.log(`Found ${images.length} images to optimize...`);

  // Process each image
  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;
  let processedCount = 0;
  const results = [];

  for (const imagePath of images) {
    const result = await optimizeImage(imagePath, outputDir);

    if (result) {
      processedCount++;
      totalOriginalSize += parseFloat(result.originalSize);
      totalOptimizedSize += parseFloat(result.optimizedSize);
      results.push(result);
    }
  }

  // Summary
  const totalSavings = ((totalOriginalSize - totalOptimizedSize) / totalOriginalSize * 100).toFixed(1);

  console.log(`✅ Optimized ${processedCount} images`);
  console.log(`📊 Size reduction: ${totalSavings}% (${totalOriginalSize.toFixed(2)}MB → ${totalOptimizedSize.toFixed(2)}MB)`);

  // Create a manifest file for the build process
  const manifest = {
    timestamp: new Date().toISOString(),
    processed: processedCount,
    totalOriginalSize: totalOriginalSize.toFixed(2),
    totalOptimizedSize: totalOptimizedSize.toFixed(2),
    savings: totalSavings,
    images: results.map(r => ({
      original: path.relative(publicDir, r.original),
      optimized: path.relative(publicDir, r.optimized),
      savings: r.savings
    }))
  };

  const manifestPath = path.join(outputDir, 'optimization-manifest.json');
  await fsPromises.writeFile(manifestPath, JSON.stringify(manifest, null, 2));

  console.log('📝 Optimization manifest saved');
  console.log('🚀 Build process continuing...\n');
}

// Run the script
optimizeImagesForBuild().catch(error => {
  console.error('❌ Image optimization failed:', error.message);
  process.exit(1);
});
