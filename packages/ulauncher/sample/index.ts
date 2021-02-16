import { resolve } from 'path'
import { Ulauncher } from '../src/ulauncher'

new Ulauncher({
  dir: {
    dist: `${__dirname}/dist`,
    themes: resolve('../../mock'),
  },
}).compile()
