import {parseFunction} from '../parseFunction'
import type {AnyNode} from '../AnyNode'
import type {State} from '../State'

describe('parseFunction()', () => {
  it('parses function with no arguments', () => {
    const state: State = {
      input: '()',
      pos: 0,
    }
    const result = parseFunction(state, 'test')
    expect(result).toEqual({
      args: [],
      name: 'test',
      prefix: undefined,
      type: 'Function',
    })
    expect(state.pos).toBe(2)
  })

  it('parses function with one argument', () => {
    const state: State = {
      input: '(arg)',
      pos: 0,
    }
    const result = parseFunction(state, 'test')
    expect(result).toEqual({
      args: [{
        items: [{
          type: 'Identifier',
          value: 'arg',
        }],
        type: 'Expression',
      }],
      name: 'test',
      prefix: undefined,
      type: 'Function',
    })
    expect(state.pos).toBe(5)
  })

  it('parses function with multiple arguments', () => {
    const state: State = {
      input: '(arg1, arg2)',
      pos: 0,
    }
    const result = parseFunction(state, 'test')
    expect(result).toEqual({
      args: [{
        items: [{
          type: 'Identifier',
          value: 'arg1',
        }],
        type: 'Expression',
      }, {
        items: [{
          type: 'Identifier',
          value: 'arg2',
        }],
        type: 'Expression',
      }],
      name: 'test',
      prefix: undefined,
      type: 'Function',
    })
    expect(state.pos).toBe(12)
  })

  it('parses function with prefix', () => {
    const state: State = {
      input: '(arg)',
      pos: 0,
    }
    const prefix = {
      type: 'Identifier',
      value: 'before',
    } as AnyNode
    const result = parseFunction(state, 'test', prefix)
    expect(result).toEqual({
      args: [{
        items: [{
          type: 'Identifier',
          value: 'arg',
        }],
        type: 'Expression',
      }],
      name: 'test',
      prefix: {
        type: 'Identifier',
        value: 'before',
      },
      type: 'Function',
    })
    expect(state.pos).toBe(5)
  })

  it('parses function with complex arguments', () => {
    const state: State = {
      input: '(color:red, "value")',
      pos: 0,
    }
    const result = parseFunction(state, 'test')
    expect(result).toEqual({
      args: [{
        items: [{
          name: 'color',
          type: 'CssProperty',
          value: {
            items: [{
              type: 'Identifier',
              value: 'red',
            }],
            type: 'Expression',
          },
        }],
        type: 'Expression',
      }, {
        items: [{
          quote: '"',
          type: 'QuotedString',
          value: 'value',
        }],
        type: 'Expression',
      }],
      name: 'test',
      prefix: undefined,
      type: 'Function',
    })
    expect(state.pos).toBe(20)
  })

  it('handles whitespace in arguments', () => {
    const state: State = {
      input: '( arg1 , arg2 )',
      pos: 0,
    }
    const result = parseFunction(state, 'test')
    expect(result).toEqual({
      args: [{
        items: [{
          type: 'Identifier',
          value: 'arg1',
        }],
        type: 'Expression',
      }, {
        items: [{
          type: 'Identifier',
          value: 'arg2',
        }],
        type: 'Expression',
      }],
      name: 'test',
      prefix: undefined,
      type: 'Function',
    })
    expect(state.pos).toBe(15)
  })
})
