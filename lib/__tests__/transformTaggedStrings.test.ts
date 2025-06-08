import {join} from 'node:path'
import {readFileSync} from 'node:fs'
import {transformTaggedStrings} from '../transformTaggedStrings'

describe('extractCandidatesFromTaggedStrings()', () => {
  it('extracts candidates from tagged strings', () => {
    const inputFixturePath = join(
      __dirname,
      '..',
      '__fixtures__',
      'taggedStrings.input.ts',
    )
    const outputFixturePath = join(
      __dirname,
      '..',
      '__fixtures__',
      'taggedStrings.output.ts',
    )
    const input = readFileSync(inputFixturePath, 'utf8')
    const output = readFileSync(outputFixturePath, 'utf8')
    const result = transformTaggedStrings(input)
    const code = result.transformedCode.code
    expect(code + '\n').toBe(output)
  })
})
