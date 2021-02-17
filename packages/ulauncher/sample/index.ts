import { mockDir } from '@mock/setup'
import { Ulauncher } from '../src/ulauncher'

const { root, dist, themes } = mockDir(__dirname)

new Ulauncher({ paths: { root, dist, themes } }).compile()
