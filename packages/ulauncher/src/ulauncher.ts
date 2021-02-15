import { File, Builder, IBuilder } from '@zort/core'
import { join } from 'path'
import { IUlauncher } from './ulauncher.interface'

export class Ulauncher extends Builder implements IUlauncher.Builder {
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
      this.metadata[file] = File.read(join(__dirname, '..', 'meta', file))
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
