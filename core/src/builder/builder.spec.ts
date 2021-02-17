import { mockClean, mockSchemaJSON, mockDir } from '@mock/setup'
import { Builder } from './builder'

describe('Builder', () => {
  const { dist, themes, root } = mockDir()

  const builder = new Builder({ paths: { root, dist, themes } })

  afterEach(() => {
    mockClean()
  })

  describe('ThemeName', () => {
    it('should generate the actual display name for the theme in camel case', () => {
      expect(builder.themeName('zort')).toBe('Zort')
      expect(builder.themeName('zort.aye')).toBe('Zort Aye')
    })
  })

  describe('Build', () => {
    const { oneFile, manyFiles, invalid } = mockSchemaJSON()

    it('you should build a simple JSON theme', () => {
      expect(builder.build(oneFile)).toBeInstanceOf(Builder)
    })

    it('you must build a separate theme in a folder with several files', () => {
      expect(builder.build(manyFiles)).toBeInstanceOf(Builder)
    })

    it('should return an error for a thema with undefined styles', () => {
      expect(() => builder.build(invalid)).toThrow()
    })
  })
})
