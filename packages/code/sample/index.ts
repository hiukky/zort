import { resolve } from 'path'
import { Code } from '../src/code'

new Code({
  dir: {
    dist: `${__dirname}/dist`,
    themes: resolve('../../mock'),
  },
}).compile()
