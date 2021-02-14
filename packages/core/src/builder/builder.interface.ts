export namespace IBuilder {
  export interface Common {
    compile(): void
  }

  export type Props = {
    dir: Record<'dist' | 'themes', string>
  }
}
