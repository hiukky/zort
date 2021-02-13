export type ICodeSettings = {
  foreground: string
  fontStyle: 'none' | 'bold' | 'italic'
}

export type ICodeFontStyle = 'none' | 'bold' | 'italic'

export type ICodeSchema = {
  colors: Record<string, string>
  tokenColors: {
    name: string
    scope: string[]
    settings: ICodeSettings[]
  }
}

export type ICodeOptions = {
  type: 'dark' | 'light'
  fontStyle: ICodeFontStyle[]
}

export type ICodeOptionsWithVariant<T> = ICodeOptions & {
  name?: string
  variant: T
}

export type ICodeProps<T extends string> =
  | Partial<ICodeOptions>
  | ICodeOptionsWithVariant<T>[]
