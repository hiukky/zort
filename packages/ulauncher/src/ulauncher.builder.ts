import { Builder, File } from '@zort/core'
import { IUlauncher } from './ulauncher.interface'

export class UlauncherBuilder extends Builder {
  public get files(): IUlauncher.Schema {
    const files: IUlauncher.Schema = {
      'manifest.json': '',
      'theme-gtk-3.20.css': '',
      'theme.css': '',
    }

    Object.keys(files).forEach(fileName => {
      const file = File.read(__dirname, '..', 'meta', fileName)
      files[fileName as IUlauncher.Files] = file
    })

    return files
  }
}
