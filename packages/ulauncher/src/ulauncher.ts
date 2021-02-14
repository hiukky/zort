import { FileHelper, IBuilderProps, Builder } from '@eren/core'
import { IUlauncherFiles, IUlauncherSchema } from './ulauncher.interface'

export class Ulauncher extends Builder {
  private metadata: IUlauncherSchema

  constructor(props: IBuilderProps) {
    super(props)
    this.metadata = {} as IUlauncherSchema

    this.assemble()
  }

  private get files(): IUlauncherFiles[] {
    return ['manifest.json', 'theme-gtk-3.20.css', 'theme.css']
  }

  assemble(): this {
    Object.values(this.files).forEach(file => {
      const metadata = FileHelper.read(`${process.cwd()}/meta/${file}`)

      this.metadata[file] = file.includes('.json')
        ? JSON.parse(metadata)
        : metadata
    })

    return this
  }

  compile(): boolean {
    this.forDir(this.metadata)
    return true
  }
}
