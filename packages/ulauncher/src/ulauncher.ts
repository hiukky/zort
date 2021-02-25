import { IBuilder } from '@zort/core'
import { IUlauncher } from './ulauncher.interface'
import { UlauncherBuilder } from './ulauncher.builder'

export class Ulauncher implements IUlauncher.Builder {
  private themes: IBuilder.Theme
  private builder: UlauncherBuilder

  constructor(props: IBuilder.Props) {
    this.builder = new UlauncherBuilder(props)
    this.themes = {}
  }

  private async stage(): Promise<this> {
    const variants = await this.builder.variants()

    Object.keys(variants).forEach(async variant => {
      this.themes[variant] = await this.builder.files()
    })

    return this
  }

  async compile(): Promise<boolean> {
    await this.stage()

    await this.builder.build(this.themes)

    return true
  }
}
