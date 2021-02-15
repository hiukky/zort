import { File, Builder, IBuilder } from '@zort/core'
import { ICode } from './code.interface'

export class Code implements ICode.Builder {
  private options: ICode.Props

  private metadata: ICode.Schema

  private themes: IBuilder.Theme

  private builder: Builder

  constructor(props: IBuilder.Props) {
    this.builder = new Builder(props)

    this.themes = {} as IBuilder.Theme
    this.metadata = {} as ICode.Schema
    this.options = {} as ICode.Options

    this.assemble()
  }

  private assemble(): this {
    this.metadata = JSON.parse(
      File.read(__dirname, '..', 'meta', 'schema.json'),
    )
    this.options = {
      type: 'dark',
      fontStyle: ['none'],
    }

    return this
  }

  private manifestFor(
    variant: string,
  ): Record<'name' | 'variant' | 'type', string> {
    const { type } = this.options

    return { name: this.builder.themeName(variant), variant, type }
  }

  private stage(): this {
    const { fontStyle } = this.options

    Object.keys(this.builder.variants).forEach(variant => {
      fontStyle.forEach(fontType => {
        const themeName =
          fontType === 'none'
            ? `${variant}.json`
            : `${variant}.${fontType}.json`

        this.themes[variant] = {
          ...this.themes[variant],
          [themeName]: JSON.stringify({
            ...this.manifestFor(variant),
            ...this.metadata,
          }).replaceAll('$fontStyle', fontType),
        }
      })
    })

    return this
  }

  set(options: ICode.Props): this {
    this.options = { ...this.options, ...options }
    return this
  }

  compile(): boolean {
    this.stage()
    return this.builder.build(this.themes)
  }
}
