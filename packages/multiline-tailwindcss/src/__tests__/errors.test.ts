import {dedent} from '@borela-tech/ts-toolbox'
import {transformJsxCssClasses} from '../transformJsxCssClasses'

describe('error reporting', () => {
  it('reports error with context for invalid tailwind classes in JSX', () => {
    const CODE = `
      <div className="bg-red-500, /* unclosed comment text-blue-600"></div>
    `
    const expected = dedent`
      1| bg-red-500, /* unclosed comment text-blue-600
                                                      ^
         Unclosed comment
    `

    try {
      transformJsxCssClasses(CODE)
    } catch (error) {
      const e = error as Error
      expect(e).toBeDefined()
      expect(e.message).toBe(expected)
    }
  })
})
