import { Code } from '../src/code'

new Code({
  dir: {
    dist: `${__dirname}/dist`,
    themes: `${__dirname}/themes`,
  },
}).build()
