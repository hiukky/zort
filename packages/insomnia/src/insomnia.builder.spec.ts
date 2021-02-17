import { mockClean, mockDir } from '@mock/setup'
import { File } from '@zort/core'

import { InsomniaBuilder } from './insomnia.builder'

describe('InsomniaBuilder', () => {
  const { root, dist, themes, temp } = mockDir()
  const builder = new InsomniaBuilder({ paths: { root, dist, themes } })

  afterEach(() => {
    mockClean()
  })

  describe('Files', () => {
    it('should return an object containing the metadata needed to compile the theme', () => {
      expect(builder.files).toEqual({
        theme: expect.any(Object),
      })
    })
  })

  describe('GenerateMainFile', () => {
    it('should generate an index.js file with the import of all themes', () => {
      new InsomniaBuilder({
        paths: { root, dist: temp, themes },
      }).generateMainFile()

      expect(File.read(temp, 'index.js')).toBe(
        "module.exports.themes = [require('./temp/zort.json')]",
      )
    })
  })
})
