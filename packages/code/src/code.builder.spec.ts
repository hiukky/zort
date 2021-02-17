import { mockClean, mockDir, mockPkgJSON } from '@mock/setup'
import { File } from '@zort/core'
import { CodeBuilder } from './code.builder'

describe('CodeBuilder', () => {
  const { root, themes, temp, dist } = mockDir()
  const builder = new CodeBuilder({ paths: { root, dist: temp, themes } })

  afterEach(() => {
    mockClean()

    File.create({
      fileName: 'package.json',
      path: root,
      matadata: JSON.stringify(mockPkgJSON(), null, 2),
    })
  })

  describe('Files', () => {
    it('should return an object containing the metadata needed to compile the theme', () => {
      const { files } = builder

      expect(files).toEqual({
        colors: expect.any(Object),
        tokenColors: expect.any(Array),
      })
    })
  })

  describe('GenerateManifest', () => {
    it('should generate a manifest for theme', () => {
      expect(builder.generateManifest('zort.aye', 'dark')).toEqual({
        name: 'Zort Aye',
        variant: 'zort.aye',
        type: 'dark',
      })
    })
  })

  describe('GetPkgMetadata', () => {
    it('should generate a metadata for the compiled dark themes', () => {
      expect(builder.getPkgMetadata('dark')).toEqual([
        {
          label: 'Zort',
          uiTheme: 'vs-dark',
          path: './temp/zort.json',
        },
      ])
    })

    it('should generate a metadata for the compiled light themes', () => {
      expect(builder.getPkgMetadata('light')).toEqual([
        {
          label: 'Zort',
          uiTheme: 'vs',
          path: './temp/zort.json',
        },
      ])
    })
  })

  describe('UpdatePkgJSON', () => {
    it('should update the package.json with the metadata of the compiled themes', () => {
      expect(builder.updatePkgJSON('dark')).toBeInstanceOf(CodeBuilder)

      const pkgJSONUpdated = JSON.parse(File.read(root, 'package.json'))

      expect(pkgJSONUpdated).toMatchObject({
        ...mockPkgJSON(),
        contributes: {
          themes: [
            {
              label: 'Zort',
              uiTheme: 'vs-dark',
              path: './temp/zort.json',
            },
          ],
        },
      })
    })

    it('should return an error for a package.json not found', () => {
      expect(() =>
        new CodeBuilder({ paths: { root: dist, dist, themes } }).updatePkgJSON(
          'dark',
        ),
      ).toThrow('No package.json was found in the project directory.')
    })
  })
})
