import { Builder, File } from '@zort/core'
import { createVSIX } from 'vsce'
import { ICode, ISchema } from './code.interface'

export class CodeBuilder extends Builder {
  private package: string = ''

  public async files(): Promise<ICode.Schema> {
    return JSON.parse(await File.read(__dirname, '..', 'meta', 'schema.json'))
  }

  public generateManifest(
    variant: string,
    type: ISchema.IType,
  ): ICode.Manifest {
    return { name: this.themeName(variant), variant, type }
  }

  public async getPkgMetadata(
    type: ISchema.IType,
  ): Promise<ICode.ContributeSchema[]> {
    return (await this.listThemesBuilt()).map(dir => ({
      label: this.themeName(dir.replace('.json', '').match(/[^/]+$/g)![0]),
      uiTheme: type === 'light' ? 'vs' : 'vs-dark',
      path: dir,
    }))
  }

  public async createExtension(): Promise<void> {
    await createVSIX({ cwd: this.props.paths.root, useYarn: true })
  }

  public async updatePkgJSON(type: ISchema.IType): Promise<this> {
    try {
      const { root } = this.props.paths

      this.package = JSON.parse(await File.read(root, 'package.json'))

      this.package = Object.assign(this.package, {
        contributes: { themes: await this.getPkgMetadata(type) },
      })

      await File.create({
        fileName: 'package.json',
        path: root,
        matadata: JSON.stringify(this.package, null, 2),
      })

      return this
    } catch (error) {
      throw new Error('No package.json was found in the project directory.')
    }
  }
}
