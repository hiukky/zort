import { File, SCSS, IBuilder, ISCSS } from '..'

export class Builder {
  private props: IBuilder.Props

  protected variants: ISCSS.Schema

  constructor(props: IBuilder.Props) {
    this.props = props
    this.variants = SCSS.readAllForJSON(props.dir.themes)
  }

  themeName(variant: string) {
    return variant
      .split('.')
      .map(word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
      .join(' ')
  }

  build(themes: IBuilder.Theme): boolean {
    const { dist } = this.props.dir

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

    return true
  }
}
