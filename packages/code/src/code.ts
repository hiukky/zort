import { File, Builder, IBuilder } from '@eren/core'
import { ICode } from './code.interface'

export class Code<T extends string> extends Builder implements IBuilder.Common {
  private options: ICode.Props<T>

  private metadata: ICode.Schema

  constructor(props: IBuilder.Props) {
    super(props)
    this.options = []
    this.metadata = {} as ICode.Schema

    this.assemble()
  }

  /**
   * @name defaultOptions
   *
   * @desc List of predefined parameters.
   */
  private get defaultOptions(): ICode.Options {
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
    this.metadata = JSON.parse(File.read(`${process.cwd()}/meta/schema.json`))

    return this
  }

  /**
   * @name set
   *
   * @desc Set custom options for the theme.
   *
   * @param options
   */
  set<O extends ICode.Props<T>>(options: O): this {
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
   * @name compile
   *
   * @desc Build the themes.
   */
  compile(): boolean {
    this.forFile(this.metadata, 'json')
    return true
  }
}
