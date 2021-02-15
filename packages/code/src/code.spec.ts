import { mockClean, mockDir } from '@mock/setup'
import { Code } from './code'

describe('Code', () => {
  const { dist, themes } = mockDir()

  const code = new Code({ dir: { dist, themes } })

  afterAll(() => {
    mockClean()
  })

  describe('Build', () => {
    it('should successfully a theme for VS Code', () => {
      expect(code.compile()).toBe(true)
    })
  })

  describe('Set', () => {
    it('should must build the theme with the custom options', () => {
      expect(code.set({ type: 'light', fontStyle: ['italic'] }).compile()).toBe(
        true,
      )
    })
  })
})
