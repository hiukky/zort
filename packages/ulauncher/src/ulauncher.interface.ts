export namespace IUlauncher {
  export type Manifest = Record<
    'manifest_version' | 'extend_theme' | 'css_file' | 'css_file_gtk_3.20+',
    string
  > & {
    matched_text_hl_colors: Record<
      'when_selected' | 'when_not_selected',
      string
    >
  }

  export type Schema = Record<
    'manifest.json' | 'theme-gtk-3.20.css' | 'theme.css',
    string
  >

  export type Files = keyof Schema
}
