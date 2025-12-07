import {join} from 'node:path'
import {loadRawExamples} from './loadRawExamples'
import {readFileSync} from 'node:fs'
import {transformJsxCssClasses} from '../../transformJsxCssClasses'

describe('transformJsxCssClasses()', () => {
  const examples = loadRawExamples()
  const inputFixturePath = join(
    __dirname,
    '..',
    '..',
    '__fixtures__',
    'integration',
    'jsx.input.tsx',
  )
  const outputFixturePath = join(
    __dirname,
    '..',
    '..',
    '__fixtures__',
    'integration',
    'jsx.output.tsx',
  )
  const inputTemplate = readFileSync(inputFixturePath, 'utf8')
  const outputTemplate = readFileSync(outputFixturePath, 'utf8')

  for (const [index, example] of examples.entries()) {
    const exampleLabel = index == examples.length - 1
      ? 'All examples combined'
      : `${example.input}`
    it(`transforms JSX CSS classes correctly: ${exampleLabel}`, () => {
      const indentedEscapedInput = example.input
        .split('\n')
        .map(line => '          ' + line)
        .join('\n')
        .replace(/"/g, '&quot;')
      const escapedOutput = example.output
        .replace(/"/g, '&quot;')
      const preparedInput = inputTemplate.replace('{{CSS_CONTENT}}', indentedEscapedInput)
      const preparedOutput = outputTemplate.replace('{{CSS_CONTENT}}', escapedOutput)

      const result = transformJsxCssClasses(preparedInput)
      const code = result.transformedCode.code
      expect(code + '\n').toBe(preparedOutput)
    })
  }
})
