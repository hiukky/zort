import { File, Builder, IBuilder } from '@zort/core'
import { IInsomnia } from './insomnia.interface'

export class Insomnia extends Builder implements IInsomnia.Builder {
  private metadata: IInsomnia.Schema

  private themes: IBuilder.Theme

  constructor(props: IBuilder.Props) {
    super(props)

    this.themes = {} as IBuilder.Theme
    this.metadata = {} as IInsomnia.Schema

    this.assemble()
  }

  private assemble(): this {
    this.metadata = JSON.parse(
      File.read(__dirname, '..', 'meta', 'schema.json'),
    )
    return this
  }

  private manifestFor(
    variant: string,
  ): Record<'displayName' | 'variant' | 'name', string> {
    return { displayName: this.themeName(variant), name: variant, variant }
  }

  private stage(): this {
    Object.keys(this.variants).forEach(variant => {
      this.themes[variant] = {
        [`${variant}.json`]: JSON.stringify({
          ...this.manifestFor(variant),
          ...this.metadata,
        }),
      }
    })

    return this
  }

  compile(): boolean {
    return this.stage().build(this.themes)
  }
}
