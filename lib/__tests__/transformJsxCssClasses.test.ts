import {join} from 'node:path'
import {readFileSync} from 'node:fs'
import {transformJsxCssClasses} from '../transformJsxCssClasses'

describe('extractCandidatesFromTaggedStrings()', () => {
  it('extracts candidates from tagged strings', () => {
    const inputFixturePath = join(
      __dirname,
      '..',
      '__fixtures__',
      'jsx.input.tsx',
    )
    const outputFixturePath = join(
      __dirname,
      '..',
      '__fixtures__',
      'jsx.output.tsx',
    )
    const input = readFileSync(inputFixturePath, 'utf8')
    const output = readFileSync(outputFixturePath, 'utf8')
    const result = transformJsxCssClasses(input)
    const code = result.transformedCode.code
    expect(code + '\n').toBe(output)
  })
})
