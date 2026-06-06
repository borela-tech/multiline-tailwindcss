import {parseExpression} from '../parseExpression'
import type {State} from '../State'

describe('parseExpression()', () => {
  it('parses simple identifiers separated by spaces', () => {
    const state: State = {
      input: 'bg red',
      pos: 0,
    }
    const result = parseExpression(state)
    expect(result).toEqual({
      items: [{
        type: 'Identifier',
        value: 'bg',
      }, {
        type: 'Identifier',
        value: 'red',
      }],
      type: 'Expression',
    })
    expect(state.pos).toBe(6)
  })

  it('parses CSS property', () => {
    const state: State = {
      input: 'color:red',
      pos: 0,
    }
    const result = parseExpression(state)
    expect(result).toEqual({
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
    })
    expect(state.pos).toBe(9)
  })

  it('parses function', () => {
    const state: State = {
      input: 'rgb(255,0,0)',
      pos: 0,
    }
    const result = parseExpression(state)
    expect(result).toEqual({
      items: [{
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
    })
    expect(state.pos).toBe(12)
  })

  it('parses mixed expression', () => {
    const state: State = {
      input: 'bg color:red rgb(255,0,0)',
      pos: 0,
    }
    const result = parseExpression(state)
    expect(result).toEqual({
      items: [{
        type: 'Identifier',
        value: 'bg',
      }, {
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
    })
    expect(state.pos).toBe(25)
  })

  it('stops at comma', () => {
    const state: State = {
      input: 'bg, red',
      pos: 0,
    }
    const result = parseExpression(state)
    expect(result).toEqual({
      items: [{
        type: 'Identifier',
        value: 'bg',
      }],
      type: 'Expression',
    })
    expect(state.pos).toBe(2)
  })

  it('stops at closing parenthesis', () => {
    const state: State = {
      input: 'bg) red',
      pos: 0,
    }
    const result = parseExpression(state)
    expect(result).toEqual({
      items: [{
        type: 'Identifier',
        value: 'bg',
      }],
      type: 'Expression',
    })
    expect(state.pos).toBe(2)
  })

  it('stops at closing bracket', () => {
    const state: State = {
      input: 'bg] red',
      pos: 0,
    }
    const result = parseExpression(state)
    expect(result).toEqual({
      items: [{
        type: 'Identifier',
        value: 'bg',
      }],
      type: 'Expression',
    })
    expect(state.pos).toBe(2)
  })

  it('skips underscores', () => {
    const state: State = {
      input: 'bg_red blue',
      pos: 0,
    }
    const result = parseExpression(state)
    expect(result).toEqual({
      items: [{
        type: 'Identifier',
        value: 'bg',
      }, {
        type: 'Identifier',
        value: 'red',
      }, {
        type: 'Identifier',
        value: 'blue',
      }],
      type: 'Expression',
    })
    expect(state.pos).toBe(11)
  })

  it('parses complex linear-gradient expression', () => {
    const state: State = {
      input: 'linear-gradient(to_right,theme(colors.zinc.900/50%),transparent)',
      pos: 0,
    }
    const result = parseExpression(state)
    expect(result).toEqual({
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
        type: 'Function',
      }],
      type: 'Expression',
    })
    expect(state.pos).toBe(64)
  })

  it('handles empty expression', () => {
    const state: State = {
      input: '',
      pos: 0,
    }
    const result = parseExpression(state)
    expect(result).toEqual({
      items: [],
      type: 'Expression',
    })
    expect(state.pos).toBe(0)
  })

  it('parses quoted strings', () => {
    const state: State = {
      input: '\'hello\' "world"',
      pos: 0,
    }
    const result = parseExpression(state)
    expect(result).toEqual({
      items: [{
        quote: '\'',
        type: 'QuotedString',
        value: 'hello',
      }, {
        quote: '"',
        type: 'QuotedString',
        value: 'world',
      }],
      type: 'Expression',
    })
    expect(state.pos).toBe(15)
  })

  it('handles whitespace correctly', () => {
    // Leading whitespace
    let state: State = {
      input: '  bg red',
      pos: 0,
    }
    let result = parseExpression(state)
    expect(result).toEqual({
      items: [{
        type: 'Identifier',
        value: 'bg',
      }, {
        type: 'Identifier',
        value: 'red',
      }],
      type: 'Expression',
    })
    expect(state.pos).toBe(8)

    // Multiple spaces between items
    state = {
      input: 'bg   red',
      pos: 0,
    }
    result = parseExpression(state)
    expect(result).toEqual({
      items: [{
        type: 'Identifier',
        value: 'bg',
      }, {
        type: 'Identifier',
        value: 'red',
      }],
      type: 'Expression',
    })
    expect(state.pos).toBe(8)
  })
})
