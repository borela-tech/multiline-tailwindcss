import {loadRawExamples} from '../loadRawExamples'
import {transformTailwindClasses} from '../../transformTailwindClasses'

describe('transformTailwindClasses()', () => {
  const examples = loadRawExamples()

  for (const [index, example] of examples.entries()) {
    const exampleLabel = index == examples.length - 1
      ? 'All examples combined'
      : `${example.input}`
    it(`transforms Tailwind classes correctly: ${exampleLabel}`, () => {
      const result = transformTailwindClasses(example.input)
      expect(result).toBe(example.output)
    })
  }
})
