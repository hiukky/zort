import { File, Builder, IBuilder } from '@eren/core'
import { IUlauncher } from './ulauncher.interface'

export class Ulauncher extends Builder implements IBuilder.Common {
  private metadata: IUlauncher.Schema

  constructor(props: IBuilder.Props) {
    super(props)
    this.metadata = {} as IUlauncher.Schema

    this.assemble()
  }

  private get files(): IUlauncher.Files[] {
    return ['manifest.json', 'theme-gtk-3.20.css', 'theme.css']
  }

  assemble(): this {
    Object.values(this.files).forEach(file => {
      const metadata = File.read(`${process.cwd()}/meta/${file}`)

      this.metadata[file] = file.includes('.json')
        ? JSON.parse(metadata)
        : metadata
    })

    return this
  }

  compile(): boolean {
    this.forDir(this.metadata)
    return true
  }
}
