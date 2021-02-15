import { mockClean, mockDir } from '@mock/setup'
import { Insomnia } from './insomnia'

describe('Insomnia', () => {
  const { dist, themes } = mockDir()

  const insomnia = new Insomnia({ dir: { dist, themes } })

  afterAll(() => {
    mockClean()
  })

  describe('Build', () => {
    it('should successfully a theme for Insomnia', () => {
      expect(insomnia.compile()).toBe(true)
    })
  })
})
