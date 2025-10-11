import {join} from 'node:path'
import {loadRawExamples} from './loadRawExamples'
import {readFileSync} from 'node:fs'
import {transformTaggedStrings} from '../../transformTaggedStrings'

describe('transformTaggedStrings()', () => {
  const examples = loadRawExamples()
  const inputFixturePath = join(
    __dirname,
    '..',
    '..',
    '__fixtures__',
    'integration',
    'taggedStrings.input.ts',
  )
  const outputFixturePath = join(
    __dirname,
    '..',
    '..',
    '__fixtures__',
    'integration',
    'taggedStrings.output.ts',
  )
  const inputTemplate = readFileSync(inputFixturePath, 'utf8')
  const outputTemplate = readFileSync(outputFixturePath, 'utf8')

  for (const [index, example] of examples.entries()) {
    it(`extracts correctly. Example #${index + 1}`, () => {
      console.log(`Running example #${index + 1}`)

      const indentedInput = example.input
        .split('\n')
        .map(line => '  ' + line)
        .join('\n')
      const escapedOutput = example.output
        .replace(/\\/g, '\\\\')
        .replace(/"/g, '\\"')
      const preparedInput = inputTemplate.replace('{{CSS_CONTENT}}', indentedInput)
      const preparedOutput = outputTemplate.replace('{{CSS_CONTENT}}', escapedOutput)

      const result = transformTaggedStrings(preparedInput)
      const code = result.transformedCode.code
      expect(code + '\n').toBe(preparedOutput)
    })
  }
})
