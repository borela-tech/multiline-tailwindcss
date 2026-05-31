import {parseBracketedExpression} from '../../parser/parseBracketedExpression'
import type {AnyNode} from '../../parser/AnyNode'
import type {State} from '../../parser/State'

describe('parseBracketedExpression()', () => {
  it('parses simple bracketed expression', () => {
    const state: State = {
      input: '[bg]',
      pos: 0,
    }
    const result = parseBracketedExpression(state)
    expect(result).toEqual({
      type: 'BracketedExpression',
      value: [{
        items: [{
          type: 'Identifier',
          value: 'bg',
        }],
        type: 'Expression',
      }],
    })
    expect(state.pos).toBe(4)
  })

  it('parses bracketed expression with prefix', () => {
    const state: State = {
      input: '[bg red]',
      pos: 0,
    }
    const prefix = {
      type: 'Identifier',
      value: 'test',
    } as AnyNode
    const result = parseBracketedExpression(state, prefix)
    expect(result).toEqual({
      prefix,
      type: 'BracketedExpression',
      value: [{
        items: [{
          type: 'Identifier',
          value: 'bg',
        }, {
          type: 'Identifier',
          value: 'red',
        }],
        type: 'Expression',
      }],
    })
    expect(state.pos).toBe(8)
  })

  it('parses complex bracketed expression', () => {
    const state: State = {
      input: '[color:red rgb(255,0,0)]',
      pos: 0,
    }
    const result = parseBracketedExpression(state)
    expect(result).toEqual({
      type: 'BracketedExpression',
      value: [{
        items: [{
          name: 'color',
          type: 'CssProperty',
          value: {
            items: [{
              type: 'Identifier',
              value: 'red',
            }, {
              args: [{
                items: [{
                  type: 'Identifier',
                  value: '255',
                }],
                type: 'Expression',
              }, {
                items: [{
                  type: 'Identifier',
                  value: '0',
                }],
                type: 'Expression',
              }, {
                items: [{
                  type: 'Identifier',
                  value: '0',
                }],
                type: 'Expression',
              }],
              name: 'rgb',
              type: 'Function',
            }],
            type: 'Expression',
          },
        }],
        type: 'Expression',
      }],
    })
    expect(state.pos).toBe(24)
  })

  it('handles empty brackets', () => {
    const state: State = {
      input: '[]',
      pos: 0,
    }
    const result = parseBracketedExpression(state)
    expect(result).toEqual({
      type: 'BracketedExpression',
      value: [],
    })
    expect(state.pos).toBe(2)
  })

  it('parses bracketed expression with linear-gradient', () => {
    const state: State = {
      input: '[linear-gradient(to_right,theme(colors.zinc.900/50%),transparent)]',
      pos: 0,
    }
    const result = parseBracketedExpression(state)
    expect(result).toEqual({
      prefix: undefined,
      type: 'BracketedExpression',
      value: [{
        items: [{
          args: [{
            items: [{
              type: 'Identifier',
              value: 'to',
            }, {
              type: 'Identifier',
              value: 'right',
            }],
            type: 'Expression',
          }, {
            items: [{
              args: [{
                items: [{
                  type: 'Identifier',
                  value: 'colors.zinc.900/50%',
                }],
                type: 'Expression',
              }],
              name: 'theme',
              prefix: undefined,
              type: 'Function',
            }],
            type: 'Expression',
          }, {
            items: [{
              type: 'Identifier',
              value: 'transparent',
            }],
            type: 'Expression',
          }],
          name: 'linear-gradient',
          prefix: undefined,
          type: 'Function',
        }],
        type: 'Expression',
      }],
    })
    expect(state.pos).toBe(66)
  })

  it('parses multiple expressions separated by comma', () => {
    const state: State = {
      input: '[bg, red]',
      pos: 0,
    }
    const result = parseBracketedExpression(state)
    expect(result).toEqual({
      type: 'BracketedExpression',
      value: [{
        items: [{
          type: 'Identifier',
          value: 'bg',
        }],
        type: 'Expression',
      }, {
        items: [{
          type: 'Identifier',
          value: 'red',
        }],
        type: 'Expression',
      }],
    })
    expect(state.pos).toBe(9)
  })

  it('starts from given position', () => {
    const state: State = {
      input: 'prefix[bg]',
      pos: 6,
    }
    const result = parseBracketedExpression(state)
    expect(result).toEqual({
      type: 'BracketedExpression',
      value: [{
        items: [{
          type: 'Identifier',
          value: 'bg',
        }],
        type: 'Expression',
      }],
    })
    expect(state.pos).toBe(10)
  })

  it('parses animation with spaces', () => {
    const state: State = {
      input: '[wiggle 1s ease-in-out infinite]',
      pos: 0,
    }
    const result = parseBracketedExpression(state)
    expect(result).toEqual({
      type: 'BracketedExpression',
      value: [{
        items: [{
          type: 'Identifier',
          value: 'wiggle',
        }, {
          type: 'Identifier',
          value: '1s',
        }, {
          type: 'Identifier',
          value: 'ease-in-out',
        }, {
          type: 'Identifier',
          value: 'infinite',
        }],
        type: 'Expression',
      }],
    })
    expect(state.pos).toBe(32)
  })
})
