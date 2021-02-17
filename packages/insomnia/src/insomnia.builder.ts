import { Builder, File } from '@zort/core'
import { IInsomnia } from './insomnia.interface'

export class InsomniaBuilder extends Builder {
  public get files(): IInsomnia.Schema {
    return JSON.parse(File.read(__dirname, '..', 'meta', 'schema.json'))
  }

  public generateManifest(variant: string): IInsomnia.Manifest {
    return {
      displayName: this.themeName(variant),
      name: variant,
      variant,
    }
  }

  public generateMainFile(): boolean {
    const payload: string[] = []

    this.listThemesBuilt().forEach(path => {
      payload.push(`require('${path}')`)
    })

    File.create({
      fileName: 'index.js',
      path: this.props.paths.dist,
      matadata: `module.exports.themes = ${JSON.stringify(payload).replaceAll(
        '"',
        '',
      )}`,
    })

    return true
  }
}
