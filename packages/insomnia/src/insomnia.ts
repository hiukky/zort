import { IBuilder } from '@zort/core'
import { IInsomnia } from './insomnia.interface'
import { InsomniaBuilder } from './insomnia.builder'

export class Insomnia implements IInsomnia.Builder {
  private metadata: IInsomnia.Schema

  private themes: IBuilder.Theme

  private builder: InsomniaBuilder

  constructor(props: IBuilder.Props) {
    this.builder = new InsomniaBuilder(props)

    this.metadata = this.builder.files
    this.themes = {}
  }

  private stage(): this {
    Object.keys(this.builder.variants).forEach(variant => {
      this.themes[variant] = {
        [`${variant}.json`]: JSON.stringify({
          ...this.builder.generateManifest(variant),
          ...this.metadata,
        }),
      }
    })

    return this
  }

  compile(): boolean {
    this.stage()
    this.builder.build(this.themes).generateMainFile()
    return true
  }
}
