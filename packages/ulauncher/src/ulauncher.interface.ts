export type IUlauncherManifest = Record<
  'manifest_version' | 'extend_theme' | 'css_file' | 'css_file_gtk_3.20+',
  string
> & {
  matched_text_hl_colors: Record<'when_selected' | 'when_not_selected', string>
}

export type IUlauncherSchema = {
  'manifest.json': string
  'theme-gtk-3.20.css': string
  'theme.css': string
}

export type IUlauncherFiles = keyof IUlauncherSchema
