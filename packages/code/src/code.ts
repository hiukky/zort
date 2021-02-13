import {
  IBuilder,
  IBuilderProps,
  FileHelper,
  ScssHelper,
  IScssSchema,
} from '@eren/core'
import { ICodeOptions, ICodeProps, ICodeSchema } from './code.interface'

export class Code<T extends string> implements IBuilder {
  private props: IBuilderProps

  private options: ICodeProps<T>

  private metadata: ICodeSchema

  private variants: IScssSchema[]

  private themes: Record<string, ICodeSchema>[]

  constructor(props: IBuilderProps) {
    this.props = props
    this.options = []
    this.metadata = {} as ICodeSchema
    this.variants = []
    this.themes = []
  }

  /**
   * @name defaultOptions
   *
   * @desc List of predefined parameters.
   */
  private get defaultOptions(): ICodeOptions {
    return {
      type: 'dark',
      fontStyle: ['bold'],
    }
  }

  /**
   * @name assemble
   *
   * @desc Initialize the module by loading the terms defined by the customer and the
   *       metadata for construction.
   */
  private assemble(): this {
    this.variants = ScssHelper.readAllForJSON(this.props.dir.themes)
    this.metadata = JSON.parse(
      FileHelper.read(`${process.cwd()}/meta/schema.json`),
    )

    return this
  }

  /**
   * @name set
   *
   * @desc Set custom options for the theme.
   *
   * @param options
   */
  set<O extends ICodeProps<T>>(options: O): this {
    if (Array.isArray(options) && options.length) {
      this.options = Array.from(options).map(option => ({
        ...this.defaultOptions,
        ...option,
      }))
    } else {
      this.options = { ...this.defaultOptions, ...options }
    }

    return this
  }

  /**
   * @name setColors
   *
   * @desc Merge metadata with client-defined color schema.
   */
  private setColors(): this {
    this.themes = this.variants.map(schema => {
      const [themeName, colors] = Object.entries(schema)[0]

      return {
        [`${themeName}.json`]: ScssHelper.merge(this.metadata, colors),
      }
    })

    return this
  }

  /**
   * @name compile
   *
   * @desc Build the themes.
   */
  compile(): boolean {
    this.assemble().setColors()

    this.themes.forEach(theme => {
      const [name, metadata] = Object.entries(theme)[0]

      FileHelper.create({
        path: this.props.dir.dist,
        matadata: JSON.stringify(metadata),
        fileName: name,
      })
    })

    return true
  }
}
