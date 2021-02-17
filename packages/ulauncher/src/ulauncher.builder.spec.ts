import { mockDir } from '@mock/setup'
import { UlauncherBuilder } from './ulauncher.builder'

describe('UlauncherBuilder', () => {
  const { root, themes, dist } = mockDir()
  const builder = new UlauncherBuilder({ paths: { root, dist, themes } })

  describe('Files', () => {
    it('should return an object containing the metadata needed to compile the theme', () => {
      const { files } = builder

      expect(files).toEqual({
        'manifest.json': expect.any(String),
        'theme-gtk-3.20.css': expect.any(String),
        'theme.css': expect.any(String),
      })
    })
  })
})
