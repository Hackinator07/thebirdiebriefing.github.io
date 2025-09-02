const fs = require('fs');
const path = require('path');

// Copy data files to public directory for runtime access
function copyDataFiles() {
  const dataDir = path.join(process.cwd(), 'src', 'data');
  const publicDataDir = path.join(process.cwd(), 'out', 'data');
  
  // Create data directory in public if it doesn't exist
  if (!fs.existsSync(publicDataDir)) {
    fs.mkdirSync(publicDataDir, { recursive: true });
  }
  
  // Copy rankings data files
  const filesToCopy = [
    'rankings.json',
    'cme-globe-rankings.json', 
    'money-list-rankings.json'
  ];
  
  filesToCopy.forEach(file => {
    const sourcePath = path.join(dataDir, file);
    const destPath = path.join(publicDataDir, file);
    
    if (fs.existsSync(sourcePath)) {
      fs.copyFileSync(sourcePath, destPath);
      console.log(`✅ Copied ${file} to public directory`);
    } else {
      console.warn(`⚠️  ${file} not found in source directory`);
    }
  });
}

// Run the copy function
copyDataFiles();
