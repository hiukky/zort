import {
  FileHelper,
  IBuilder,
  IBuilderProps,
  IScssSchema,
  ScssHelper,
} from '@eren/core'
import { InsomniaSchema } from './insomnia.interface'

export class Insomnia implements IBuilder {
  private props: IBuilderProps

  private variants: IScssSchema[]

  private metadata: InsomniaSchema

  private themes: Record<string, InsomniaSchema>[]

  constructor(props: IBuilderProps) {
    this.props = props
    this.variants = []
    this.themes = []
    this.metadata = {} as InsomniaSchema
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
   * @name compile
   *
   * @desc Build the themes.
   */
  compile(): true {
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
