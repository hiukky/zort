import { Code } from '../src/code'

new Code<'flate' | 'flate.punk' | 'flate.arc'>({
  dir: {
    dist: `${__dirname}/dist`,
    themes: `${__dirname}/themes`,
  },
})
  .set({
    type: 'dark',
    fontStyle: ['italic', 'bold'],
  })
  .compile()
