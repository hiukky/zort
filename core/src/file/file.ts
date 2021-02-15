import fs from 'fs'
import { IFile } from './file.interface'

export class File {
  static read(path: string): string {
    try {
      return fs.readFileSync(path, 'utf8').toString()
    } catch (error) {
      throw new Error('File not found')
    }
  }

  static list(path: string): string[] {
    try {
      return fs.readdirSync(path).filter(theme => theme.match(/\.[0-9a-z]+$/i))
    } catch (error) {
      throw new Error('Directory not found')
    }
  }

  static create({ path, fileName, matadata }: IFile.Create): boolean {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true })
    }

    fs.writeFileSync(`${path}/${fileName}`, matadata, {
      encoding: 'utf8',
    })

    return true
  }
}
