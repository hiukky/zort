import { mockClean, mockDir } from '@mock/setup'
import { Insomnia } from './insomnia'

describe('Insomnia', () => {
  const { root, dist, themes } = mockDir()

  const insomnia = new Insomnia({ paths: { root, dist, themes } })

  afterAll(async () => {
    await mockClean()
  })

  describe('Build', () => {
    it('should successfully a theme for Insomnia', async () => {
      expect(insomnia.compile()).resolves.toBe(true)
    })
  })
})
