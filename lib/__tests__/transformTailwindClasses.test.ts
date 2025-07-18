import {join} from 'node:path'
import {readFileSync} from 'node:fs'
import {transformTailwindClasses} from '../transformTailwindClasses'

describe('squishMultilineExpressions()', () => {
  it('affects only expressions', () => {
    const inputFixturePath = join(
      __dirname,
      '..',
      '__fixtures__',
      'classes.input.txt',
    )
    const outputFixturePath = join(
      __dirname,
      '..',
      '__fixtures__',
      'classes.output.txt',
    )
    const input = readFileSync(inputFixturePath, 'utf8')
    const output = readFileSync(outputFixturePath, 'utf8')
    const result = transformTailwindClasses(input)
    expect(result + '\n').toBe(output)
  })
})
