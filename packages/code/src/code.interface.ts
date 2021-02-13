import { IBuilder, IBuilderProps } from '@eren/core'

export interface ICode extends IBuilder {}

export type ICodeProps = IBuilderProps

export type ICodeSettings = {
  foreground: string
  fontStyle: 'none' | 'bold' | 'italic'
}

export type ICodeSchema = {
  colors: Record<string, string>
  tokenColors: {
    name: string
    scope: string[]
    settings: ICodeSettings[]
  }
}
