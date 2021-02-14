export type InsomniaSize = 'default' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type InsomniaColors =
  | 'default'
  | 'success'
  | 'notice'
  | 'warning'
  | 'danger'
  | 'surprise'
  | 'info'

export type InsomniaColorsSchema = Record<InsomniaColors, string>

export type InsomniaSizeSchema = Record<InsomniaSize, string>

export type InsomniaComponentSchema = {
  background: InsomniaColorsSchema
  foreground: InsomniaColorsSchema
  highlight: InsomniaSizeSchema
}

export type InsomniaSchema = {
  theme: {
    background: InsomniaColorsSchema
    foreground: InsomniaColorsSchema
    highlight: InsomniaSizeSchema
    rawCss: string
    styles: Record<
      | 'dialog'
      | 'dropdown'
      | 'pane'
      | 'paneHeader'
      | 'sidebar'
      | 'sidebarHeader'
      | 'sidebarList',
      InsomniaComponentSchema
    >
  }
}
