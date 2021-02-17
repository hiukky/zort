export namespace IBuilder {
  export interface Common {
    compile(): void
  }

  export type Props = {
    paths: Record<'root' | 'dist' | 'themes', string>
  }

  export type Theme = Record<string, Record<string, string>>
}
