export namespace IBuilder {
  export interface Common {
    compile(): void
  }

  export type Props = {
    dir: Record<'dist' | 'themes', string>
  }

  export type Theme = Record<string, Record<string, string>>
}
