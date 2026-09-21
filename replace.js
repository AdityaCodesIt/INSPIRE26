const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  
  content = content.replace(/VIKAS/g, 'INSPIRE');
  content = content.replace(/Vikas/g, 'Inspire');
  content = content.replace(/vikas/g, 'inspire');
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content);
    console.log(`Replaced in ${filePath}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.css')) {
      replaceInFile(fullPath);
    }
  }
}

walkDir('./src');
