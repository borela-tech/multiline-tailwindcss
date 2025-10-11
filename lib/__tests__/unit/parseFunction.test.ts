import {parseFunction} from '../../parser/parseFunction'
import {State} from '../../parser/State'

describe('parseFunction()', () => {
  it('parses function with no arguments', () => {
    const state: State = {input: '()', pos: 0}
    const result = parseFunction(state, 'test')
    expect(result).toEqual({
      type: 'Function',
      name: 'test',
      pseudoElement: undefined,
      args: [],
    })
    expect(state.pos).toBe(2)
  })

  it('parses function with one argument', () => {
    const state: State = {input: '(arg)', pos: 0}
    const result = parseFunction(state, 'test')
    expect(result).toEqual({
      type: 'Function',
      name: 'test',
      pseudoElement: undefined,
      args: [
        {
          type: 'Expression',
          items: [{type: 'Identifier', value: 'arg'}],
        },
      ],
    })
    expect(state.pos).toBe(5)
  })

  it('parses function with multiple arguments', () => {
    const state: State = {input: '(arg1, arg2)', pos: 0}
    const result = parseFunction(state, 'test')
    expect(result).toEqual({
      type: 'Function',
      name: 'test',
      pseudoElement: undefined,
      args: [
        {
          type: 'Expression',
          items: [{type: 'Identifier', value: 'arg1'}],
        },
        {
          type: 'Expression',
          items: [{type: 'Identifier', value: 'arg2'}],
        },
      ],
    })
    expect(state.pos).toBe(12)
  })

  it('parses function with pseudoElement', () => {
    const state: State = {input: '(arg)', pos: 0}
    const result = parseFunction(state, 'test', 'before')
    expect(result).toEqual({
      type: 'Function',
      name: 'test',
      pseudoElement: 'before',
      args: [
        {
          type: 'Expression',
          items: [{type: 'Identifier', value: 'arg'}],
        },
      ],
    })
    expect(state.pos).toBe(5)
  })

  it('parses function with complex arguments', () => {
    const state: State = {input: '(color:red, "value")', pos: 0}
    const result = parseFunction(state, 'test')
    expect(result).toEqual({
      type: 'Function',
      name: 'test',
      pseudoElement: undefined,
      args: [
        {
          type: 'Expression',
          items: [
            {
              type: 'CssProperty',
              name: 'color',
              value: {
                type: 'Expression',
                items: [{type: 'Identifier', value: 'red'}],
              },
            },
          ],
        },
        {
          type: 'Expression',
          items: [
            {
              type: 'QuotedString',
              value: 'value',
              quote: '"',
            },
          ],
        },
      ],
    })
    expect(state.pos).toBe(20)
  })

  it('handles whitespace in arguments', () => {
    const state: State = {input: '( arg1 , arg2 )', pos: 0}
    const result = parseFunction(state, 'test')
    expect(result).toEqual({
      type: 'Function',
      name: 'test',
      pseudoElement: undefined,
      args: [
        {
          type: 'Expression',
          items: [{type: 'Identifier', value: 'arg1'}],
        },
        {
          type: 'Expression',
          items: [{type: 'Identifier', value: 'arg2'}],
        },
      ],
    })
    expect(state.pos).toBe(15)
  })
})
