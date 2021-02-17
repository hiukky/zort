import { IBuilder } from '@zort/core'
import { IUlauncher } from './ulauncher.interface'
import { UlauncherBuilder } from './ulauncher.builder'

export class Ulauncher implements IUlauncher.Builder {
  private metadata: IUlauncher.Schema
  private themes: IBuilder.Theme
  private builder: UlauncherBuilder

  constructor(props: IBuilder.Props) {
    this.builder = new UlauncherBuilder(props)
    this.metadata = this.builder.files
    this.themes = {}
  }

  private stage(): this {
    Object.keys(this.builder.variants).forEach(variant => {
      this.themes[variant] = this.metadata
    })

    return this
  }

  compile(): boolean {
    this.stage()
    this.builder.build(this.themes)
    return true
  }
}
