export type IBuilderProps = {
  dir: Record<'dist' | 'themes', string>
}

export interface IBuilder {
  compile(): void
}
