import { File, Builder, IBuilder } from '@zort/core'
import { IInsomnia } from './insomnia.interface'

export class Insomnia extends Builder implements IBuilder.Common {
  private metadata: IInsomnia.Schema

  constructor(props: IBuilder.Props) {
    super(props)
    this.metadata = {} as IInsomnia.Schema

    this.assemble()
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
   * @name compile
   *
   * @desc Build the themes.
   */
  compile(): boolean {
    return this.forFile(this.metadata, 'json')
  }
}
