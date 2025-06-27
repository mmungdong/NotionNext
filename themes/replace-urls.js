// themes/replace-urls.js
import { readFileSync, writeFileSync } from 'fs'
import path from 'path'

const root = process.cwd()
const distPath = path.join(root, '.next')

// 递归替换所有md文件中的图片链接
function replaceInMarkdown(dir) {
  const files = require('fs').readdirSync(dir)
  for (const file of files) {
    const filePath = path.join(dir, file)
    if (file === '.DS_Store') continue
    
    if (file.endsWith('.md')) {
      let content = readFileSync(filePath, 'utf-8')
      content = content.replace(
        /https:\/\/raw.githubusercontent.com\/[^/]+\/[^/]+\/[^/]+\/(.+)/g,
        'https://hub.gitmirror.com/1/$1'
      )
      writeFileSync(filePath, content)
    } else if (require('fs').lstatSync(filePath).isDirectory()) {
      replaceInMarkdown(filePath)
    }
  }
}

// 替换_next/static资源路径
function replaceStaticFiles() {
  const staticDir = path.join(distPath, '_next/static')
  if (require('fs').existsSync(staticDir)) {
    require('fs').readdirSync(staticDir).forEach(file => {
      const filePath = path.join(staticDir, file)
      if (file.endsWith('.json')) {
        let content = readFileSync(filePath, 'utf-8')
        content = content.replace(
          /"url": "https:\/\/raw.githubusercontent.com\/[^"]+"/g,
          '"url": "https://hub.gitmirror.com/1"'
        )
        writeFileSync(filePath, content)
      }
    })
  }
}

// 主执行逻辑
replaceInMarkdown(distPath)
replaceStaticFiles()
console.log('URL replacement completed successfully')
