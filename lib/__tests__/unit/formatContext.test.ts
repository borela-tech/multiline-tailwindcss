import {adjustExpectedString} from '../adjustExpectedString'
import {formatContext} from '../../parser/formatContext'
import {State} from '../../parser/State'

describe('formatContext()', () => {
  it('formats context for position at start of single-line input', () => {
    const state: State = {input: 'hello world', pos: 0}
    const message = 'Error at start'
    const result = formatContext(state, message)
    const expected = adjustExpectedString(`
      1| hello world
         ^
         Error at start
    `)
    expect(result).toBe(expected)
  })

  it('formats context for position in middle of single-line input', () => {
    const state: State = {input: 'hello world', pos: 6}
    const message = 'Space error'
    const result = formatContext(state, message)
    const expected = adjustExpectedString(`
      1| hello world
               ^
         Space error
    `)
    expect(result).toBe(expected)
  })

  it('formats context for multi-line input with position at start of second line', () => {
    const state: State = {input: 'line1\nline2\nline3', pos: 6}
    const message = 'Error on line2'
    const result = formatContext(state, message)
    const expected = adjustExpectedString(`
      1| line1
      2| line2
         ^
         Error on line2
      3| line3
    `)
    expect(result).toBe(expected)
  })
})
