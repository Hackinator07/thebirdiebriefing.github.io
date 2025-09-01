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

// Optimize the LPGA money logo
const inputPath = 'public/images/lpga-money-logo.png';
const outputPath = 'public/optimized/lpga-money-logo.webp';

optimizeSingleImage(inputPath, outputPath);
