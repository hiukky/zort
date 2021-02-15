import { mockDir } from '@mock/setup'
import { Code } from '../src/code'

const { dist, themes } = mockDir(__dirname)

new Code({ dir: { dist, themes } }).compile()
