import glob from 'glob'
import { File, SCSS, IBuilder, ISCSS } from '..'

export class Builder {
  public props: IBuilder.Props

  constructor(props: IBuilder.Props) {
    this.props = props
  }

  public async variants(): Promise<ISCSS.Schema> {
    return SCSS.readAllForJSON(this.props.paths.themes)
  }

  public themeName(variant: string) {
    return variant
      .split('.')
      .map(word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
      .join(' ')
  }

  public listThemesBuilt(): Promise<string[]> {
    const { dist } = this.props.paths

    return new Promise((resolve, reject) => {
      glob(`${dist}/**/*.json`, (err, data) =>
        data
          ? resolve(
              data.map(
                path => `./${path?.replace(dist.replace(/[^/]+$/g, ''), '')}`,
              ),
            )
          : reject(err),
      )
    })
  }

  public async build(themes: IBuilder.Theme): Promise<this> {
    const { dist } = this.props.paths

    const variants = await this.variants()

    Object.entries(themes).forEach(([themeName, files]) => {
      const dirname =
        Object.keys(files).length <= 1
          ? dist
          : `${dist}/${themeName.replace('.', '-')}`

      const merged = SCSS.merge(files, variants[themeName])

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
