import { File, Builder, IBuilder } from '@zort/core'
import { IInsomnia } from './insomnia.interface'

export class Insomnia implements IInsomnia.Builder {
  private metadata: IInsomnia.Schema

  private themes: IBuilder.Theme

  private builder: Builder

  constructor(props: IBuilder.Props) {
    this.builder = new Builder(props)

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
    return {
      displayName: this.builder.themeName(variant),
      name: variant,
      variant,
    }
  }

  private generateMainFile(): boolean {
    const payload: string[] = []

    Object.entries(this.themes).forEach(([, files]) => {
      Object.keys(files).forEach(fileName => {
        payload.push(`require('./${fileName}')`)
      })
    })

    File.create({
      fileName: 'index.js',
      path: this.builder.props.paths.dist,
      matadata: `module.exports.themes = ${JSON.stringify(payload).replaceAll(
        '"',
        '',
      )}`,
    })

    return true
  }

  private stage(): this {
    Object.keys(this.builder.variants).forEach(variant => {
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
    this.stage()

    this.builder.build(this.themes)

    return this.generateMainFile()
  }
}
