import { Builder, File } from '@zort/core'
import { IInsomnia } from './insomnia.interface'

export class InsomniaBuilder extends Builder {
  public async files(): Promise<IInsomnia.Schema> {
    const data = await File.read(__dirname, '..', 'meta', 'schema.json')
    return JSON.parse(data)
  }

  public generateManifest(variant: string): IInsomnia.Manifest {
    return {
      displayName: this.themeName(variant),
      name: variant,
      variant,
    }
  }

  public async generateMainFile(): Promise<this> {
    const payload: string[] = (await this.listThemesBuilt()).map(
      (path: any) => `require('${path}')`,
    )

    await File.create({
      fileName: 'index.js',
      path: this.props.paths.dist,
      matadata: `module.exports.themes = ${JSON.stringify(payload).replaceAll(
        '"',
        '',
      )}`,
    })

    return this
  }
}
