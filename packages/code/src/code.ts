import { IBuilder } from '@zort/core'
import { ICode } from './code.interface'
import { CodeBuilder } from './code.builder'

export class Code implements ICode.Builder {
  private options: ICode.Props
  private metadata: ICode.Schema
  private themes: IBuilder.Theme
  private builder: CodeBuilder

  constructor(props: IBuilder.Props) {
    this.builder = new CodeBuilder(props)

    this.themes = {}
    this.metadata = this.builder.files
    this.options = {
      type: 'dark',
      fontStyle: ['none'],
    }
  }

  private stage(): this {
    const { fontStyle, type } = this.options

    Object.keys(this.builder.variants).forEach(variant => {
      fontStyle.forEach(fontType => {
        const themeName =
          fontType === 'none'
            ? `${variant}.json`
            : `${variant}.${fontType}.json`

        this.themes[variant] = {
          ...this.themes[variant],
          [themeName]: JSON.stringify({
            ...this.builder.generateManifest(variant, type),
            ...this.metadata,
          }).replaceAll('$fontStyle', fontType),
        }
      })
    })

    return this
  }

  public set(options: ICode.Props): this {
    this.options = { ...this.options, ...options }
    return this
  }

  public compile(): boolean {
    this.stage()
    this.builder.build(this.themes).updatePkgJSON(this.options.type)
    return true
  }
}
