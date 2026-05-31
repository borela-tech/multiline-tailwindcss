import {parseQuotedString} from '../../parser/parseQuotedString'
import type {State} from '../../parser/State'

describe('parseQuotedString()', () => {
  it('parses single quoted strings', () => {
    const state: State = {
      input: "'hello world'",
      pos: 0,
    }
    const result = parseQuotedString(state)
    expect(result).toEqual({
      quote: "'",
      type: 'QuotedString',
      value: 'hello_world',
    })
    expect(state.pos).toBe(13)
  })

  it('parses double quoted strings', () => {
    const state: State = {
      input: '"hello world"',
      pos: 0,
    }
    const result = parseQuotedString(state)
    expect(result).toEqual({
      quote: '"',
      type: 'QuotedString',
      value: 'hello_world',
    })
    expect(state.pos).toBe(13)
  })

  it('parses quoted strings with escapes', () => {
    const state: State = {
      input: String.raw`'hello \'world\''`,
      pos: 0,
    }
    const result = parseQuotedString(state)
    expect(result).toEqual({
      quote: "'",
      type: 'QuotedString',
      value: "hello_'world'",
    })
    expect(state.pos).toBe(17)
  })

  it('parses quoted strings with escaped underscore', () => {
    const state: State = {
      input: String.raw`'hello\_world'`,
      pos: 0,
    }
    const result = parseQuotedString(state)
    expect(result).toEqual({
      quote: "'",
      type: 'QuotedString',
      value: String.raw`hello\_world`,
    })
    expect(state.pos).toBe(14)
  })

  it('handles empty quoted strings', () => {
    const state: State = {
      input: "''",
      pos: 0,
    }
    const result = parseQuotedString(state)
    expect(result).toEqual({
      quote: "'",
      type: 'QuotedString',
      value: '',
    })
    expect(state.pos).toBe(2)
  })
})
