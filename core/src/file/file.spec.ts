import { mockClean, mockDir } from '@mock/setup'
import { File } from './file'

describe('File', () => {
  const { temp, dist } = mockDir()

  afterAll(() => {
    mockClean()
  })

  describe('Read', () => {
    it('should read a file and return its content', () => {
      expect(File.read(`${temp}/.gitkeep`)).toBe('Mock Files for Zort!')
    })

    it('should return error for file not found', () => {
      expect(() => File.read(`${temp}/.gitkee`)).toThrow('File not found')
    })
  })

  describe('List', () => {
    it('should list all the files in a directory', () => {
      expect(File.list(temp)).toEqual(['.gitkeep'])
    })

    it('should return a directory not found error', () => {
      expect(() => File.list(`${temp}/not`)).toThrow('Directory not found')
    })
  })

  describe('Create', () => {
    it('you should create a .gitkeep save in the dist directory', () => {
      const result = File.create({
        fileName: '.gitkeep',
        matadata: 'Gitkeep created!',
        path: dist,
      })

      expect(result).toBe(true)
      expect(File.read(`${dist}/.gitkeep`)).toBe('Gitkeep created!')
    })
  })
})
