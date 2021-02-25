import { File, ISCSS } from '..'

export class SCSS {
  static toJSON(file: string): ISCSS.JSON {
    let data = {}

    if (file) {
      data = file
        .split(/\n/)
        .filter(s => !!s)
        .map(s => s.replace(';', '').split(':'))
        .map(([k, v]) => ({ ...data, [k]: v?.trim() }))
        .reduce((a, b) => ({ ...a, ...b }))
    }

    return data
  }

  static async read(path: string, fileName: string): Promise<ISCSS.JSON> {
    const file = (await File.read(`${path}/${fileName}`)).split(';')

    const [dependencies] = (
      await Promise.all(
        file
          .filter(row => /@import/.test(row))
          .map(async row => {
            const key = row.split(' ')[1].slice(1, -1)
            return File.read(`${path}/_${key.replace('./', '')}.scss`)
          }),
      )
    ).map(data => this.toJSON(data))

    const mergedDependencies = Object.entries(
      this.toJSON(file.filter(row => !/@import/.test(row)).join(';')),
    )
      .map(([key, value]) => ({
        [key]: /\$/.test(value) ? dependencies[value] : value,
      }))
      .reduce((a, b) => ({ ...a, ...b }))

    return { ...dependencies, ...mergedDependencies }
  }

  static merge<S, T extends ISCSS.JSON>(source: S, target: T): S {
    let output = source

    if (!target) {
      throw new Error('Color scheme not defined for the specified theme.')
    }

    Object.keys(target).forEach(colorName => {
      output = JSON.parse(
        JSON.stringify(output).replaceAll(colorName, target[colorName]),
      )
    })

    return output
  }

  static async readAllForJSON(path: string): ISCSS.Schema {
    const files = await File.list(path)

    const data = await Promise.all(
      files
        .filter(fileName => !fileName.startsWith('_'))
        .map(async fileName => {
          if (!/.\.scss$/.test(fileName)) {
            throw new Error(
              'The informed directory does not contain valid SCSS files.',
            )
          }

          return {
            [fileName.replace('.scss', '')]: await this.read(path, fileName),
          }
        }),
    )

    return data.reduce((a, b) => ({ ...a, ...b }))
  }
}
