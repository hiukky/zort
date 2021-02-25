import { mockClean, mockDir } from '@mock/setup'
import { Ulauncher } from './ulauncher'

describe('Ulauncher', () => {
  const { root, dist, themes } = mockDir()

  const ulauncher = new Ulauncher({ paths: { root, dist, themes } })

  afterAll(async () => {
    await mockClean()
  })

  describe('Build', () => {
    it('should successfully a theme for Ulauncher', async () => {
      expect(ulauncher.compile()).resolves.toBe(true)
    })
  })
})
