import { IBuilder } from '@zort/core'

export namespace ISchema {
  export type IType = 'dark' | 'light'
  export type UITheme = 'vs' | 'vs-dark' | 'hc-black'
  export type FontStyle = 'none' | 'bold' | 'italic'
  export type Settings = {
    foreground: string
    fontStyle: 'none' | 'bold' | 'italic'
  }
}

export namespace ICode {
  export type Options = {
    type: ISchema.IType
    fontStyle: ISchema.FontStyle[]
    extension: boolean
  }

  export type Schema = {
    colors: Record<string, string>
    tokenColors: {
      name: string
      scope: string[]
      settings: ISchema.Settings[]
    }
  }

  export type ContributeSchema = Record<'label' | 'uiTheme' | 'path', string>
  export type Manifest = Record<'name' | 'variant' | 'type', string>
  export type Props = Options
  export interface Builder extends IBuilder.Common {
    set(options: Props): this
  }
}
