import { mockClean, mockDir } from '@mock/setup'
import { File } from './file'

describe('File', () => {
  const { temp, dist } = mockDir()

  afterAll(async () => {
    await mockClean()
  })

  describe('Read', () => {
    it('should read a file and return its content', async () => {
      expect(File.read(`${temp}/.gitkeep`)).resolves.toBe(
        'Mock Files for Zort!',
      )
    })

    it('should return error for file not found', async () => {
      expect(() => File.read(`${temp}/.gitkee`)).rejects.toThrow(
        'File not found',
      )
    })
  })

  describe('List', () => {
    it('should list all the files in a directory', async () => {
      expect(File.list(temp)).resolves.toEqual(
        expect.arrayContaining(['.gitkeep', 'zort.json']),
      )
    })

    it('should return a directory not found error', async () => {
      expect(() => File.list(`${temp}/not`)).rejects.toThrow(
        'Directory not found',
      )
    })
  })

  describe('Create', () => {
    it('you should create a .gitkeep save in the dist directory', async () => {
      const result = await File.create({
        fileName: '.gitkeep',
        matadata: 'Gitkeep created!',
        path: dist,
      })

      expect(result).toBe(true)
      expect(File.read(`${dist}/.gitkeep`)).resolves.toBe('Gitkeep created!')
    })
  })
})
