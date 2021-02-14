import { Builder, FileHelper, IBuilderProps } from '@eren/core'
import { InsomniaSchema } from './insomnia.interface'

export class Insomnia extends Builder {
  private metadata: InsomniaSchema

  constructor(props: IBuilderProps) {
    super(props)
    this.metadata = {} as InsomniaSchema

    this.assemble()
  }

  /**
   * @name assemble
   *
   * @desc Initialize the module by loading the terms defined by the customer and the
   *       metadata for construction.
   */
  private assemble(): this {
    this.metadata = JSON.parse(
      FileHelper.read(`${process.cwd()}/meta/schema.json`),
    )

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
