import { mockDir } from '@mock/setup'
import { Insomnia } from '../src/insomnia'

const { dist, themes } = mockDir(__dirname)

new Insomnia({ dir: { dist, themes } }).compile()
