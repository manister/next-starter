import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export const generateJSON = (): void => {
  const contentPath = path.join(process.cwd(), '_content')
  const dataPath = path.join(process.cwd(), '_data')
  fs.readdirSync(contentPath).forEach((folder) => {
    const folderPath = path.join(contentPath, folder)
    const fileData = fs.readdirSync(folderPath).reduce((acc, file) => {
      const raw = fs.readFileSync(`${folderPath}/${file}`, 'utf-8')
      const handle = file.replace('.md', '')
      const { data, content } = matter(raw)
      return { ...acc, [handle]: { ...data, content, handle } }
    }, {})
    fs.writeFileSync(`${dataPath}/${folder}-data.json`, JSON.stringify(fileData))
  })
}

generateJSON()
