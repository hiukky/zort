import { File, Builder, IBuilder } from '@zort/core'
import { IUlauncher } from './ulauncher.interface'

export class Ulauncher implements IUlauncher.Builder {
  private metadata: IUlauncher.Schema

  private themes: IBuilder.Theme

  private builder: Builder

  constructor(props: IBuilder.Props) {
    this.builder = new Builder(props)

    this.metadata = {} as IUlauncher.Schema
    this.themes = {} as IBuilder.Theme

    this.assemble()
  }

  private get files(): IUlauncher.Files[] {
    return ['manifest.json', 'theme-gtk-3.20.css', 'theme.css']
  }

  private assemble(): this {
    Object.values(this.files).forEach(file => {
      this.metadata[file] = File.read(__dirname, '..', 'meta', file)
    })

    return this
  }

  private stage(): this {
    Object.keys(this.builder.variants).forEach(variant => {
      this.themes[variant] = this.metadata
    })

    return this
  }

  compile(): boolean {
    this.stage()
    return this.builder.build(this.themes)
  }
}
