import {join} from 'node:path'
import {prepareRawExample} from './prepareRawExample'
import {readFileSync} from 'node:fs'

interface RawExample {
  input: string
  output: string
}

export function loadRawExamples(): RawExample[] {
  const inputPath = join(
    __dirname,
    '..',
    '__fixtures__',
    'raw.input.txt',
  )

  const outputPath = join(
    __dirname,
    '..',
    '__fixtures__',
    'raw.output.txt',
  )

  const input = readFileSync(inputPath, 'utf8')
  const output = readFileSync(outputPath, 'utf8')

  const preparedInput = prepareRawExample(input)
  const preparedOutput = prepareRawExample(output)

  if (preparedInput.length !== preparedOutput.length)
    throw new Error('Input and output examples count do not match')

  const examples: RawExample[] = []

  for (let i = 0; i < preparedInput.length; i++) {
    examples.push({
      input: preparedInput[i],
      output: preparedOutput[i],
    })
  }

  const combinedInput = examples.map(example => example.input).join('\n')
  const combinedOutput = examples.map(example => example.output).join('')
  const finalExample: RawExample = {
    input: combinedInput,
    output: combinedOutput,
  }

  return [
    ...examples,
    finalExample,
  ]
}
