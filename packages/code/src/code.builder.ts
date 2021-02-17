import { Builder, File } from '@zort/core'
import { ICode, ISchema } from './code.interface'

export class CodeBuilder extends Builder {
  private package: string = ''

  public get files(): ICode.Schema {
    return JSON.parse(File.read(__dirname, '..', 'meta', 'schema.json'))
  }

  public generateManifest(
    variant: string,
    type: ISchema.IType,
  ): ICode.Manifest {
    return { name: this.themeName(variant), variant, type }
  }

  public getPkgMetadata(type: ISchema.IType): ICode.ContributeSchema[] {
    return this.listThemesBuilt().map(dir => ({
      label: this.themeName(dir.replace('.json', '').match(/[^/]+$/g)![0]),
      uiTheme: type === 'light' ? 'vs' : 'vs-dark',
      path: dir,
    }))
  }

  public updatePkgJSON(type: ISchema.IType): this {
    try {
      const { root } = this.props.paths

      this.package = JSON.parse(File.read(root, 'package.json'))

      this.package = Object.assign(this.package, {
        contributes: { themes: this.getPkgMetadata(type) },
      })

      File.create({
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
