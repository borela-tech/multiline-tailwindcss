import {join} from 'node:path'
import {readFileSync} from 'node:fs'
import {prepareRawExample} from './prepareRawExample'

interface RawExample {
  input: string
  output: string
}

export function loadRawExamples(): RawExample[] {
  const inputPath = join(
    process.cwd(),
    'lib',
    '__fixtures__',
    'integration',
    'raw.input.txt',
  )

  const outputPath = join(
    process.cwd(),
    'lib',
    '__fixtures__',
    'integration',
    'raw.output.txt',
  )

  const input = readFileSync(inputPath, 'utf8')
  const output = readFileSync(outputPath, 'utf8')

  const preparedInput = prepareRawExample(input)
  const preparedOutput = prepareRawExample(output)

  if (preparedInput.length !== preparedOutput.length)
    throw new Error('Input and output examples count do not match')

  const examples = preparedInput.map((input, i) => ({
    input,
    output: preparedOutput[i],
  }))

  const finalExample = {
    input: examples.map(e => e.input).join('\n'),
    output: examples.map(e => e.output).join(' '),
  }

  return [...examples, finalExample]
}
