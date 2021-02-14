import { File, SCSS, IBuilder, ISCSS } from '..'

export class Builder {
  private props: IBuilder.Props

  private variants: ISCSS.Schema

  constructor(props: IBuilder.Props) {
    this.props = props
    this.variants = SCSS.readAllForJSON(props.dir.themes)
  }

  forDir<P>(payload: P): boolean {
    Object.entries(this.variants).forEach(([variantName, colors]) => {
      const merged = SCSS.merge(payload, colors)

      Object.entries(merged).forEach(([name, metadata]) => {
        File.create({
          path: `${this.props.dir.dist}/${variantName}`,
          fileName: name,
          matadata: metadata,
        })
      })
    })

    return true
  }

  forFile<P>(payload: P, extension: 'json'): boolean {
    Object.entries(this.variants).forEach(([fileName, colors]) => {
      const merged = SCSS.merge(payload, colors)

      File.create({
        path: this.props.dir.dist,
        fileName: `${fileName}.${extension}`,
        matadata: JSON.stringify(merged),
      })
    })

    return true
  }
}
