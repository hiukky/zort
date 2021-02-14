export namespace ISchema {
  export type Size = Record<
    'default' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl',
    string
  >

  export type Colors = Record<
    | 'default'
    | 'success'
    | 'notice'
    | 'warning'
    | 'danger'
    | 'surprise'
    | 'info',
    string
  >
}

export namespace IInsomnia {
  export type Component = {
    background: ISchema.Colors
    foreground: ISchema.Colors
    highlight: ISchema.Size
  }

  export type Schema = {
    theme: {
      background: ISchema.Colors
      foreground: ISchema.Colors
      highlight: ISchema.Size
      rawCss: string
      styles: Record<
        | 'dialog'
        | 'dropdown'
        | 'pane'
        | 'paneHeader'
        | 'sidebar'
        | 'sidebarHeader'
        | 'sidebarList',
        IInsomnia.Component
      >
    }
  }
}
