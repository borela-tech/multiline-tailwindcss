import {parseBracketedExpression} from '../parseBracketedExpression'
import type {AnyNode} from '../AnyNode'
import type {State} from '../State'

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

  it('parses hex color in bracketed expression', () => {
    const state: State = {
      input: '[#00ff00]',
      pos: 0,
    }
    const result = parseBracketedExpression(state)
    expect(result).toEqual({
      type: 'BracketedExpression',
      value: [{
        items: [{
          type: 'Identifier',
          value: '#00ff00',
        }],
        type: 'Expression',
      }],
    })
    expect(state.pos).toBe(9)
  })

  it('parses shorthand hex color in bracketed expression', () => {
    const state: State = {
      input: '[#abc]',
      pos: 0,
    }
    const result = parseBracketedExpression(state)
    expect(result).toEqual({
      type: 'BracketedExpression',
      value: [{
        items: [{
          type: 'Identifier',
          value: '#abc',
        }],
        type: 'Expression',
      }],
    })
    expect(state.pos).toBe(6)
  })

  it('parses uppercase hex color in bracketed expression', () => {
    const state: State = {
      input: '[#ABCDEF]',
      pos: 0,
    }
    const result = parseBracketedExpression(state)
    expect(result).toEqual({
      type: 'BracketedExpression',
      value: [{
        items: [{
          type: 'Identifier',
          value: '#ABCDEF',
        }],
        type: 'Expression',
      }],
    })
    expect(state.pos).toBe(9)
  })

  it('parses hex color with alpha in bracketed expression', () => {
    const state: State = {
      input: '[#aabbccdd]',
      pos: 0,
    }
    const result = parseBracketedExpression(state)
    expect(result).toEqual({
      type: 'BracketedExpression',
      value: [{
        items: [{
          type: 'Identifier',
          value: '#aabbccdd',
        }],
        type: 'Expression',
      }],
    })
    expect(state.pos).toBe(11)
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
