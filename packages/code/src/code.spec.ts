import { mockClean, mockDir, mockPkgJSON } from '@mock/setup'
import { File } from '@zort/core'
import { Code } from './code'

describe('Code', () => {
  const { root, dist, themes } = mockDir()

  const code = new Code({ paths: { root, dist, themes } })

  afterEach(async () => {
    await mockClean()

    await File.create({
      fileName: 'package.json',
      path: root,
      matadata: JSON.stringify(mockPkgJSON(), null, 2),
    })
  })

  describe('Build', () => {
    it('should successfully a theme for VS Code', async () => {
      expect(await code.compile()).toBe(true)
    })
  })

  describe('Set', () => {
    it('should must build the theme with the custom options', async () => {
      expect(
        await code.set({ type: 'light', fontStyle: ['italic'] }).compile(),
      ).toBe(true)
    })
  })
})
