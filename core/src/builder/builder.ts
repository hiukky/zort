import glob from 'glob'
import { File, SCSS, IBuilder, ISCSS } from '..'

export class Builder {
  public props: IBuilder.Props

  public variants: ISCSS.Schema

  constructor(props: IBuilder.Props) {
    this.props = props
    this.variants = SCSS.readAllForJSON(props.paths.themes)
  }

  public themeName(variant: string) {
    return variant
      .split('.')
      .map(word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
      .join(' ')
  }

  public listThemesBuilt(): string[] {
    const { dist } = this.props.paths

    return glob
      .sync(`${dist}/**/*.json`)
      .map(path => `./${path?.replace(dist.replace(/[^/]+$/g, ''), '')}`)
  }

  public build(themes: IBuilder.Theme): this {
    const { dist } = this.props.paths

    Object.entries(themes).forEach(([themeName, files]) => {
      const dirname =
        Object.keys(files).length <= 1
          ? dist
          : `${dist}/${themeName.replace('.', '-')}`

      const merged = SCSS.merge(files, this.variants[themeName])

      Object.entries(merged).forEach(([name, metadata]) => {
        File.create({
          path: dirname,
          fileName: name,
          matadata: metadata,
        })
      })
    })

    return this
  }
}
