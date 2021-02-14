import { File, ISCSS } from '..'

export class SCSS {
  /**
   * @name check
   *
   * @desc Checks whether the reported file is a valid scss.
   *
   * @param fileName
   */
  static check(fileName: string): boolean {
    if (!/.\.scss$/.test(fileName)) {
      throw new Error(
        'The informed directory does not contain valid SCSS files.',
      )
    }

    return true
  }

  /**
   * @method toJSON
   *
   * @desc Parse the read scss file to JSON.
   *
   * @param {String} file
   */
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

  /**
   * @method resolve
   *
   * @desc Merge complete files read and their dependencies.
   *
   * @param {String} path
   * @param {String} fileName
   */
  static read(path: string, fileName: string): ISCSS.JSON {
    const file = File.read(`${path}/${fileName}`).split(';')

    const [dependencies] = file
      .filter(row => /@import/.test(row))
      .map(row => {
        const key = row.split(' ')[1].slice(1, -1)

        return this.toJSON(File.read(`${path}/_${key.replace('./', '')}.scss`))
      })

    const mergedDependencies = Object.entries(
      this.toJSON(file.filter(row => !/@import/.test(row)).join(';')),
    )
      .map(([key, value]) => ({
        [key]: /\$/.test(value) ? dependencies[value] : value,
      }))
      .reduce((a, b) => ({ ...a, ...b }))

    return { ...dependencies, ...mergedDependencies }
  }

  /**
   * @name merge
   *
   * @desc Merge colors.
   *
   * @param source
   * @param target
   */
  static merge<S, T extends ISCSS.JSON>(source: S, target: T): S {
    let output = source

    Object.keys(target).forEach(colorName => {
      output = JSON.parse(
        JSON.stringify(output).replace(
          new RegExp(`\\${colorName}`, 'g'),
          target[colorName],
        ),
      )
    })

    return output
  }

  /**
   * @name readAllForJSON
   *
   * @desc Read all scss files from a directory and return in JSON format.
   *
   * @param path
   */
  static readAllForJSON(path: string): ISCSS.Schema {
    return File.list(path)
      .filter(fileName => !fileName.startsWith('_'))
      .map(fileName => {
        this.check(fileName)

        return {
          [fileName.replace('.scss', '')]: this.read(path, fileName),
        }
      })[0]
  }
}
