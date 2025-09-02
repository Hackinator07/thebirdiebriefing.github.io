const sharp = require('sharp');
const path = require('path');

async function optimizeSingleImage(inputPath, outputPath) {
  try {
    console.log(`🖼️  Optimizing ${path.basename(inputPath)}...`);
    
    await sharp(inputPath)
      .webp({ quality: 85 })
      .toFile(outputPath);
    
    console.log(`✅ Optimized to ${path.basename(outputPath)}`);
  } catch (error) {
    console.error('❌ Error optimizing image:', error.message);
  }
}

// Optimize the fm-wang-rd4.png image
const inputPath = 'public/images/articles/fm-wang-rd4.png';
const outputPath = 'public/optimized/fm-wang-rd4.webp';

optimizeSingleImage(inputPath, outputPath);
