import { Builder, File } from '@zort/core'
import { IUlauncher } from './ulauncher.interface'

export class UlauncherBuilder extends Builder {
  public async files(): Promise<IUlauncher.Schema> {
    const files: IUlauncher.Schema = {
      'manifest.json': '',
      'theme-gtk-3.20.css': '',
      'theme.css': '',
    }

    const metadata = await Promise.all(
      Object.keys(files).map<any>(async fileName => ({
        [fileName]: await File.read(__dirname, '..', 'meta', fileName),
      })),
    )

    return metadata.reduce((a, b) => ({ ...a, ...b }))
  }
}
