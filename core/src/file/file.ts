import fs from 'fs'
import { IFile } from './file.interface'

export class File {
  static read(path: string): string {
    return fs.readFileSync(path, 'utf8').toString()
  }

  static list(path: string): string[] {
    return fs.readdirSync(path).filter(theme => theme.match(/\.[0-9a-z]+$/i))
  }

  static create({ path, fileName, matadata }: IFile.Create): boolean {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true })
    }

    fs.writeFileSync(
      `${path}/${fileName}`,
      typeof matadata === 'string' ? matadata : JSON.stringify(matadata),
      {
        encoding: 'utf8',
      },
    )

    return true
  }
}
