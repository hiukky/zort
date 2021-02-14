export namespace ISchema {
  export type Settings = {
    foreground: string
    fontStyle: 'none' | 'bold' | 'italic'
  }

  export type FontStyle = 'none' | 'bold' | 'italic'
}

export namespace ICode {
  export type Options = {
    type: 'dark' | 'light'
    fontStyle: ISchema.FontStyle[]
  }

  export type OptionsWithVariant<T> = Options & {
    name?: string
    variant: T
  }

  export type Props<T extends string> =
    | Partial<Options>
    | OptionsWithVariant<T>[]

  export type Schema = {
    colors: Record<string, string>
    tokenColors: {
      name: string
      scope: string[]
      settings: ISchema.Settings[]
    }
  }
}
