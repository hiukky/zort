import { IBuilder } from '@zort/core'
import { IInsomnia } from './insomnia.interface'
import { InsomniaBuilder } from './insomnia.builder'

export class Insomnia implements IInsomnia.Builder {
  private themes: IBuilder.Theme

  private builder: InsomniaBuilder

  constructor(props: IBuilder.Props) {
    this.builder = new InsomniaBuilder(props)

    this.themes = {}
  }

  private async stage(): Promise<this> {
    const metadata = await this.builder.files()

    Object.keys(this.builder.variants).forEach(variant => {
      this.themes[variant] = {
        [`${variant}.json`]: JSON.stringify({
          ...this.builder.generateManifest(variant),
          ...metadata,
        }),
      }
    })

    return this
  }

  public async compile(): Promise<boolean> {
    await this.stage()

    await this.builder.build(this.themes)

    await this.builder.generateMainFile()

    return true
  }
}
