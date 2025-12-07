import {adjustExpectedString} from '../adjustExpectedString'
import {transformJsxCssClasses} from '../../transformJsxCssClasses'

describe('error reporting', () => {
  it('reports error with context for invalid tailwind classes in JSX', () => {
    const code = `
      <div className="bg-red-500, /* unclosed comment text-blue-600"></div>
    `
    const expected = adjustExpectedString(`
      1| bg-red-500, /* unclosed comment text-blue-600
                                                      ^
         Unclosed comment
    `)

    let error: Error | undefined
    try {
      transformJsxCssClasses(code)
    } catch (e) {
      error = e as Error
    }

    expect(error).toBeDefined()
    expect(error!.message).toBe(expected)
  })
})
