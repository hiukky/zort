import { resolve } from 'path'
import { Insomnia } from '..'

new Insomnia({
  dir: {
    dist: `${__dirname}/dist`,
    themes: resolve('../../mock'),
  },
}).compile()
