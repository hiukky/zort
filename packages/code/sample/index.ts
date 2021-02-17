import { mockDir } from '@mock/setup'
import { Code } from '../src/code'

const { root, dist, themes } = mockDir(__dirname)

new Code({ paths: { root, dist, themes } })
  .set({ type: 'dark', fontStyle: ['bold', 'italic'] })
  .compile()
