import {join} from 'node:path'
import {loadRawExamples} from './loadRawExamples'
import {readFileSync} from 'node:fs'
import {transformJsxCssClasses} from '../transformJsxCssClasses'

describe('transformJsxCssClasses()', () => {
  const examples = loadRawExamples()
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
  const inputTemplate = readFileSync(inputFixturePath, 'utf8')
  const outputTemplate = readFileSync(outputFixturePath, 'utf8')

  for (const [index, example] of examples.entries()) {
    it(`extracts correctly. Example #${index + 1}`, () => {
      console.log(`Running example #${index + 1}`)

      const indentedInput = example.input
        .split('\n')
        .map(line => '          ' + line)
        .join('\n')
      const outputWithEscapedBackSlashes = example.output.replace(/\\/g, '\\\\')
      const preparedInput = inputTemplate.replace('{{CSS_CONTENT}}', indentedInput)
      const preparedOutput = outputTemplate.replace('{{CSS_CONTENT}}', outputWithEscapedBackSlashes)

      const result = transformJsxCssClasses(preparedInput)
      const code = result.transformedCode.code
      expect(code + '\n').toBe(preparedOutput)
    })
  }
})
