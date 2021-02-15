export namespace ISchema {
  export type Settings = {
    foreground: string
    fontStyle: 'none' | 'bold' | 'italic'
  }

  export type IType = 'dark' | 'light'

  export type FontStyle = 'none' | 'bold' | 'italic'
}

export namespace ICode {
  export type Options = {
    type: ISchema.IType
    fontStyle: ISchema.FontStyle[]
  }

  export type Props = Options

  export type Schema = {
    colors: Record<string, string>
    tokenColors: {
      name: string
      scope: string[]
      settings: ISchema.Settings[]
    }
  }
}
