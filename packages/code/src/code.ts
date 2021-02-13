import { FileHelper, ScssHelper, IScssSchema } from '@eren/core'
import { ICode, ICodeProps, ICodeSchema } from './code.interface'

export class Code implements ICode {
  private props: ICodeProps

  private metadata: ICodeSchema

  private variants: IScssSchema[]

  private themes: Record<string, ICodeSchema>[]

  constructor(props: ICodeProps) {
    this.props = props
    this.metadata = {} as ICodeSchema
    this.variants = []
    this.themes = []
  }

  /**
   * @name readMetadata
   *
   * @desc Read all the metadata needed to build the theme.
   */
  private readMetadata(): this {
    this.metadata = JSON.parse(
      FileHelper.read(`${process.cwd()}/meta/schema.json`),
    )

    return this
  }

  /**
   * @name readThemesVariants
   *
   * @desc Read all client-defined theme variant files.
   */
  private readThemesVariants(): this {
    this.variants = ScssHelper.readAllForJSON(this.props.dir.themes)
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
  compile(): this {
    this.readMetadata().readThemesVariants().setColors()

    this.themes.forEach(theme => {
      const [name, metadata] = Object.entries(theme)[0]

      FileHelper.create({
        path: this.props.dir.dist,
        matadata: JSON.stringify(metadata),
        fileName: name,
      })
    })

    return this
  }
}
