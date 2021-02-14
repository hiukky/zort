import { resolve } from 'path'
import { Code } from '../src/code'

new Code<'eren'>({
  dir: {
    dist: `${__dirname}/dist`,
    themes: resolve('../../mock'),
  },
})
  .set({
    type: 'dark',
    fontStyle: ['italic', 'bold'],
  })
  .compile()
