import {indent} from '@borela-tech/ts-toolbox'
import {join} from 'node:path'
import {loadRawExamples} from './loadRawExamples'
import {readFileSync} from 'node:fs'
import {transformTaggedStrings} from '../transformTaggedStrings'

describe('transformTaggedStrings()', () => {
  const examples = loadRawExamples()
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
  const inputTemplate = readFileSync(inputFixturePath, 'utf8')
  const outputTemplate = readFileSync(outputFixturePath, 'utf8')

  for (const [index, example] of examples.entries()) {
    const exampleLabel = index == examples.length - 1
      ? 'All examples combined'
      : `${example.input}`
    it(`transforms tagged strings: #${index} ${exampleLabel}`, () => {
      const indentedInput = indent(example.input, 2, ' ')
        .replaceAll('\\', '\\\\')
      const escapedOutput = example.output
        .replaceAll('\\', '\\\\')
        .replaceAll('"', String.raw`\"`)
      const preparedInput = inputTemplate.replace(
        '{{CSS_CONTENT}}',
        indentedInput,
      )
      const preparedOutput = outputTemplate.replace(
        '{{CSS_CONTENT}}',
        escapedOutput,
      )

      const result = transformTaggedStrings(preparedInput)
      const code = result.transformedCode.code
      expect(code + '\n').toBe(preparedOutput)
    })
  }

  describe('expression resolution', () => {
    it('resolves variables referencing string literals', () => {
      const code = [
        'const a = "bg-red-500"',
        'const b = tailwindcss`${a}`',
      ].join('\n')

      const result = transformTaggedStrings(code)
      expect(result.transformedCode.code).toBe([
        'const a = "bg-red-500";',
        'const b = "bg-red-500";',
      ].join('\n'))
    })

    it('resolves multiple variables in the same template', () => {
      const code = [
        'const a = "hover:"',
        'const b = "focus:"',
        'const c = tailwindcss`${a}bg-red-500 ${b}bg-blue-500`',
      ].join('\n')

      const result = transformTaggedStrings(code)
      expect(result.transformedCode.code).toBe([
        'const a = "hover:";',
        'const b = "focus:";',
        'const c = "hover:bg-red-500 focus:bg-blue-500";',
      ].join('\n'))
    })

    it('collects candidates from resolved expressions', () => {
      const code = [
        'const a = "bg-red-500"',
        'const b = tailwindcss`${a} hover:text-white`',
      ].join('\n')

      const result = transformTaggedStrings(code)
      expect(result.candidatesFound).toEqual(['bg-red-500', 'hover:text-white'])
    })

    it('leaves template unchanged, warns if var not string literal', () => {
      const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
      const code = [
        'const a = 42',
        'const b = tailwindcss`${a}`',
      ].join('\n')

      const result = transformTaggedStrings(code)
      expect(result.transformedCode.code).toBe([
        'const a = 42;',
        'const b = tailwindcss`${a}`;',
      ].join('\n'))
      expect(warnSpy).toHaveBeenCalled()
      warnSpy.mockRestore()
    })

    it('leaves template unchanged, warns for non-ident expr', () => {
      const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
      const code = [
        'const b = tailwindcss`${someFn()}`',
      ].join('\n')

      const result = transformTaggedStrings(code)
      expect(result.transformedCode.code).toBe([
        'const b = tailwindcss`${someFn()}`;',
      ].join('\n'))
      expect(warnSpy).toHaveBeenCalled()
      warnSpy.mockRestore()
    })

    it('leaves template unchanged and warns for undefined variables', () => {
      const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
      const code = [
        'const b = tailwindcss`${unknownVar}`',
      ].join('\n')

      const result = transformTaggedStrings(code)
      expect(result.transformedCode.code).toBe([
        'const b = tailwindcss`${unknownVar}`;',
      ].join('\n'))
      expect(warnSpy).toHaveBeenCalled()
      warnSpy.mockRestore()
    })
  })
})
