import { File, Builder, IBuilder } from '@zort/core'
import { IUlauncher } from './ulauncher.interface'

export class Ulauncher extends Builder implements IBuilder.Common {
  private metadata: IUlauncher.Schema

  private themes: IBuilder.Theme

  constructor(props: IBuilder.Props) {
    super(props)

    this.metadata = {} as IUlauncher.Schema
    this.themes = {} as IBuilder.Theme

    this.assemble()
  }

  private get files(): IUlauncher.Files[] {
    return ['manifest.json', 'theme-gtk-3.20.css', 'theme.css']
  }

  private assemble(): this {
    Object.values(this.files).forEach(file => {
      const metadata = File.read(`${process.cwd()}/meta/${file}`)

      this.metadata[file] = file.includes('.json')
        ? JSON.parse(metadata)
        : metadata
    })

    return this
  }

  private stage(): this {
    Object.keys(this.variants).forEach(variant => {
      this.themes[variant] = this.metadata
    })

    return this
  }

  compile(): boolean {
    return this.stage().build(this.themes)
  }
}
