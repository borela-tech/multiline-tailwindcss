import {parseQuotedString} from '../../parser/parseQuotedString'
import {State} from '../../parser/State'

describe('parseQuotedString()', () => {
  it('parses single quoted strings', () => {
    const state: State = {input: "'hello world'", pos: 0}
    const result = parseQuotedString(state)
    expect(result).toEqual({
      type: 'QuotedString',
      value: 'hello_world',
      quote: "'",
    })
    expect(state.pos).toBe(13)
  })

  it('parses double quoted strings', () => {
    const state: State = {input: '"hello world"', pos: 0}
    const result = parseQuotedString(state)
    expect(result).toEqual({
      type: 'QuotedString',
      value: 'hello_world',
      quote: '"',
    })
    expect(state.pos).toBe(13)
  })

  it('parses quoted strings with escapes', () => {
    const state: State = {input: "'hello \\'world\\''", pos: 0}
    const result = parseQuotedString(state)
    expect(result).toEqual({
      type: 'QuotedString',
      value: "hello_'world'",
      quote: "'",
    })
    expect(state.pos).toBe(17)
  })

  it('parses quoted strings with escaped underscore', () => {
    const state: State = {input: "'hello\\_world'", pos: 0}
    const result = parseQuotedString(state)
    expect(result).toEqual({
      type: 'QuotedString',
      value: 'hello\\_world',
      quote: "'",
    })
    expect(state.pos).toBe(14)
  })

  it('handles empty quoted strings', () => {
    const state: State = {input: "''", pos: 0}
    const result = parseQuotedString(state)
    expect(result).toEqual({
      type: 'QuotedString',
      value: '',
      quote: "'",
    })
    expect(state.pos).toBe(2)
  })
})
