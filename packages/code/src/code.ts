import { File, Builder, IBuilder } from '@zort/core'
import { join } from 'path'
import { ICode, ISchema } from './code.interface'

export class Code extends Builder implements ICode.Builder {
  private options: ICode.Props

  private metadata: ICode.Schema

  private themes: IBuilder.Theme

  constructor(props: IBuilder.Props) {
    super(props)

    this.themes = {} as IBuilder.Theme
    this.metadata = {} as ICode.Schema
    this.options = {} as ICode.Options

    this.assemble()
  }

  private assemble(): this {
    this.metadata = JSON.parse(
      File.read(join(__dirname, '..', 'meta', 'schema.json')),
    )
    this.options = {
      type: 'dark',
      fontStyle: ['none'],
    }

    return this
  }

  private manifestFor(
    variant: string,
    type: ISchema.IType,
  ): Record<'name' | 'variant' | 'type', string> {
    return { name: this.themeName(variant), variant, type }
  }

  private stage(): this {
    const { type, fontStyle } = this.options

    Object.keys(this.variants).forEach(variant => {
      fontStyle.forEach(fontType => {
        const themeName =
          fontType === 'none'
            ? `${variant}.json`
            : `${variant}.${fontType}.json`

        this.themes[variant] = {
          ...this.themes[variant],
          [themeName]: JSON.stringify({
            ...this.manifestFor(variant, type),
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
    this.stage().build(this.themes)
    return true
  }
}
