const fs = require('fs');
const path = require('path');

// 遍历构建输出目录
const distPath = path.resolve(__dirname, 'dist');
const files = fs.readdirSync(distPath);

files.forEach(file => {
  const filePath = path.join(distPath, file);
  if (file.endsWith('.html')) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/https:\/\/raw.githubusercontent.com\/[^"]+/g, 'https://hub.gitmirror.com/$1');
    fs.writeFileSync(filePath, content);
  }
});
