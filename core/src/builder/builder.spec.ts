import { mockClean, mockSchemaJSON, mockDir } from '@mock/setup'
import { Builder } from './builder'

describe('Builder', () => {
  const { dist, themes, root, temp } = mockDir()

  const builder = new Builder({ paths: { root, dist, themes } })

  afterEach(async () => {
    await mockClean()
  })

  describe('ThemeName', () => {
    it('should generate the actual display name for the theme in camel case', () => {
      expect(builder.themeName('zort')).toBe('Zort')
      expect(builder.themeName('zort.aye')).toBe('Zort Aye')
    })
  })

  describe('ListThemesBuilt', () => {
    it('should list all compiled themes in a directory', async () => {
      expect(
        new Builder({ paths: { root, dist: temp, themes } }).listThemesBuilt(),
      ).resolves.toEqual(['./temp/zort.json'])
    })
  })

  describe('Build', () => {
    const { oneFile, manyFiles, invalid } = mockSchemaJSON()

    it('you should build a simple JSON theme', async () => {
      expect(builder.build(oneFile)).resolves.toBeInstanceOf(Builder)
    })

    it('you must build a separate theme in a folder with several files', async () => {
      expect(builder.build(manyFiles)).resolves.toBeInstanceOf(Builder)
    })

    it('should return an error for a thema with undefined styles', async () => {
      expect(builder.build(invalid)).rejects.toThrow()
    })
  })
})
