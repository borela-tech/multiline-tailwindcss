import {loadRawExamples} from './loadRawExamples'
import {transformTailwindClasses} from '../../transformTailwindClasses'

describe('transformTailwindClasses()', () => {
  const examples = loadRawExamples()

  for (const [index, example] of examples.entries()) {
    it(`transforms correctly. Example #${index + 1}`, () => {
      console.log(`Running example #${index + 1}`)
      const result = transformTailwindClasses(example.input)
      expect(result).toBe(example.output)
    })
  }
})
