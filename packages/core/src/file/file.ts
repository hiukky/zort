import fs from 'fs'
import { IFile } from './file.interface'

export class File {
  /**
   * @name read
   *
   * @desc Read file.
   *
   * @param path
   */
  static read(path: string): string {
    return fs.readFileSync(path, 'utf8').toString()
  }

  /**
   * @name list
   *
   * @desc List and return name of all files in a directory.
   *
   * @param path
   */
  static list(path: string): string[] {
    return fs.readdirSync(path).filter(theme => theme.match(/\.[0-9a-z]+$/i))
  }

  /**
   * @name create
   *
   * @desc Creates a file in a specific directory.
   *
   * @param props
   * @param props.path
   * @param props.fileName
   * @param props.metadata
   */
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
