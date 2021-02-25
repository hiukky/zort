import { readFile, readdir, mkdir, writeFile } from 'fs/promises'
import { join } from 'path'
import { IFile } from './file.interface'

export class File {
  static async read(...paths: string[]): Promise<string> {
    try {
      return await readFile(join(...paths), 'utf8')
    } catch (error) {
      throw new Error('File not found')
    }
  }

  static async list(path: string): Promise<string[]> {
    try {
      return (await readdir(path)).filter(theme => theme.match(/\.[0-9a-z]+$/i))
    } catch (error) {
      throw new Error('Directory not found')
    }
  }

  static async create({
    path,
    fileName,
    matadata,
  }: IFile.Create): Promise<boolean> {
    await mkdir(path, { recursive: true })

    await writeFile(`${path}/${fileName}`, matadata, {
      encoding: 'utf8',
    })

    return true
  }
}
