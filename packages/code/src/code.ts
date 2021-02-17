import { File, Builder, IBuilder } from '@zort/core'
import glob from 'glob'
import { ICode } from './code.interface'

export class Code implements ICode.Builder {
  private options: ICode.Props

  private package: string

  private metadata: ICode.Schema

  private themes: IBuilder.Theme

  private builder: Builder

  constructor(props: IBuilder.Props) {
    this.builder = new Builder(props)

    this.themes = {} as IBuilder.Theme
    this.metadata = {} as ICode.Schema
    this.options = {} as ICode.Options
    this.package = ''

    this.assemble()
  }

  private assemble(): this {
    const { root } = this.builder.props.paths

    this.metadata = JSON.parse(
      File.read(__dirname, '..', 'meta', 'schema.json'),
    )

    this.package = JSON.parse(File.read(root, 'package.json'))

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

  private updatePackageJSON(): boolean {
    const { dist, root } = this.builder.props.paths

    const getUiTheme = () => `vs-${this.options.type}`

    const getPath = (path?: string): string =>
      `./${path?.replace(dist.replace(/[^/]+$/g, ''), '')}`

    const getLabel = (path: string): string =>
      this.builder.themeName(path.replace('.json', '').match(/[^/]+$/g)![0])

    const themesMetadata = glob.sync(`${dist}/**/*.json`).map(dir => ({
      label: getLabel(dir),
      uiTheme: getUiTheme(),
      path: getPath(dir),
    }))

    this.package = Object.assign(this.package, {
      contributes: { themes: themesMetadata },
    })

    File.create({
      fileName: 'package.json',
      path: root,
      matadata: JSON.stringify(this.package, null, 2),
    })

    return true
  }

  public set(options: ICode.Props): this {
    this.options = { ...this.options, ...options }
    return this
  }

  public compile(): boolean {
    this.stage()

    this.builder.build(this.themes)

    return this.updatePackageJSON()
  }
}
