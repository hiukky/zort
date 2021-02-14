import { resolve } from 'path'
import { Ulauncher } from '..'

new Ulauncher({
  dir: {
    dist: `${__dirname}/dist`,
    themes: resolve('../../mock'),
  },
}).compile()
