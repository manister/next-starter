import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { IChilliData, IChilliDatum } from '~/lib/types'

export const generateChilliJSON = (): void => {
  const chilliesPath = path.join(process.cwd(), '_content/chillies')
  const dataPath = path.join(process.cwd(), '_data')

  const chilliData: IChilliData = fs.readdirSync(chilliesPath).reduce((acc, file) => {
    const raw = fs.readFileSync(`${chilliesPath}/${file}`, 'utf-8')
    const handle = file.replace('.md', '')
    const { data, content } = matter(raw)
    const chilli = { ...data, content, handle } as IChilliDatum
    return { ...acc, [handle]: chilli }
  }, {})
  fs.writeFileSync(`${dataPath}/chilli-data.json`, JSON.stringify(chilliData))
}

generateChilliJSON()
