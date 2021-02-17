import { mockDir } from '@mock/setup'
import { Insomnia } from '../src/insomnia'

const { root, dist, themes } = mockDir(__dirname)

new Insomnia({ paths: { root, dist, themes } }).compile()
