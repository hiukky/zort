import { mockClean, mockDir } from '@mock/setup'
import { Ulauncher } from './ulauncher'

describe('Ulauncher', () => {
  const { dist, themes } = mockDir()

  const ulauncher = new Ulauncher({ dir: { dist, themes } })

  afterAll(() => {
    mockClean()
  })

  describe('Build', () => {
    it('should successfully a theme for Ulauncher', () => {
      expect(ulauncher.compile()).toBe(true)
    })
  })
})
