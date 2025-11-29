import {parse} from '../../parser/parse'

describe('parse()', () => {
  it('parses bg-[linear-gradient...] from raw input', () => {
    const input = `
      bg-[
        linear-gradient(
          to_right,
          theme(colors.zinc.900/50%),
          transparent,
        ),
      ],
    `
    const ast = parse(input)
    expect(ast).toEqual([{
      type: 'BracketedExpression',
      prefix: {
        type: 'Identifier',
        value: 'bg-',
      },
      value: [{
        type: 'Expression',
        items: [{
          type: 'Function',
          name: 'linear-gradient',
          prefix: undefined,
          args: [{
            type: 'Expression',
            items: [{
              type: 'Identifier',
              value: 'to',
            }, {
              type: 'Identifier',
              value: 'right',
            }],
          }, {
            type: 'Expression',
            items: [{
              type: 'Function',
              name: 'theme',
              prefix: undefined,
              args: [{
                type: 'Expression',
                items: [{
                  type: 'Identifier',
                  value: 'colors.zinc.900/50%',
                }],
              }],
            }],
          }, {
            type: 'Expression',
            items: [{
              type: 'Identifier',
              value: 'transparent',
            }],
          }],
        }],
      }],
    }])
  })

  it('parses input with line comments at the start', () => {
    const input = `
      // Comment at start
      bg-red-500,
      text-blue-600
    `
    const ast = parse(input)
    expect(ast).toEqual([{
      type: 'Identifier',
      value: 'bg-red-500',
    }, {
      type: 'Identifier',
      value: 'text-blue-600',
    }])
  })

  it('parses input with line comments between elements', () => {
    const input = `
      bg-red-500,
      // Comment between
      text-blue-600
    `
    const ast = parse(input)
    expect(ast).toEqual([{
      type: 'Identifier',
      value: 'bg-red-500',
    }, {
      type: 'Identifier',
      value: 'text-blue-600',
    }])
  })

  it('parses input with line comments at the end of the class', () => {
    const input = `
      bg-red-500, // Comment at end of class
      text-blue-600
    `
    const ast = parse(input)
    expect(ast).toEqual([{
      type: 'Identifier',
      value: 'bg-red-500',
    }, {
      type: 'Identifier',
      value: 'text-blue-600',
    }])
  })

  it('parses input with line comments at the end', () => {
    const input = `
      bg-red-500,
      text-blue-600
      // Comment at end
    `
    const ast = parse(input)
    expect(ast).toEqual([{
      type: 'Identifier',
      value: 'bg-red-500',
    }, {
      type: 'Identifier',
      value: 'text-blue-600',
    }])
  })

  it('parses input with block comments at the start', () => {
    const input = `
      /* Block comment */
      bg-red-500,
      text-blue-600
    `
    const ast = parse(input)
    expect(ast).toEqual([{
      type: 'Identifier',
      value: 'bg-red-500',
    }, {
      type: 'Identifier',
      value: 'text-blue-600',
    }])
  })

  it('parses input with block comments between elements', () => {
    const input = `
      bg-red-500,
      /* Block comment */
      text-blue-600
    `
    const ast = parse(input)
    expect(ast).toEqual([{
      type: 'Identifier',
      value: 'bg-red-500',
    }, {
      type: 'Identifier',
      value: 'text-blue-600',
    }])
  })

  it('parses input with block comments at the end of the class', () => {
    const input = `
      bg-red-500, /* Block comment */
      text-blue-600
    `
    const ast = parse(input)
    expect(ast).toEqual([{
      type: 'Identifier',
      value: 'bg-red-500',
    }, {
      type: 'Identifier',
      value: 'text-blue-600',
    }])
  })

  it('parses input with block comments at the end', () => {
    const input = `
      bg-red-500,
      text-blue-600
      /* Block comment */
    `
    const ast = parse(input)
    expect(ast).toEqual([{
      type: 'Identifier',
      value: 'bg-red-500',
    }, {
      type: 'Identifier',
      value: 'text-blue-600',
    }])
  })

  it('throws error for unclosed block comment', () => {
    const input = `
      bg-red-500,
      /* unclosed comment
      text-blue-600
    `
    expect(() => parse(input)).toThrow('Unclosed comment')
  })

  it('parses input with comments inside brackets', () => {
    const input = `
      bg-[
        linear-gradient(/* comment */ to right, red, blue)
      ]
    `
    const ast = parse(input)
    expect(ast).toEqual([{
      type: 'BracketedExpression',
      prefix: {
        type: 'Identifier',
        value: 'bg-',
      },
      value: [{
        type: 'Expression',
        items: [{
          type: 'Function',
          name: 'linear-gradient',
          prefix: undefined,
          args: [{
            type: 'Expression',
            items: [{
              type: 'Identifier',
              value: 'to',
            }, {
              type: 'Identifier',
              value: 'right',
            }],
          }, {
            type: 'Expression',
            items: [{
              type: 'Identifier',
              value: 'red',
            }],
          }, {
            type: 'Expression',
            items: [{
              type: 'Identifier',
              value: 'blue',
            }],
          }],
        }],
      }],
    }])
  })

  it('parses complex input with mixed comments', () => {
    const input = `
      // Line comment
      bg-[
        /* Block comment */
        linear-gradient(to right, red, blue) // Another line comment
      ],
      outline-blue-500 /* Inline block comment */
      /* Another block */
      text-white
    `
    const ast = parse(input)
    expect(ast).toEqual([{
      type: 'BracketedExpression',
      prefix: {
        type: 'Identifier',
        value: 'bg-',
      },
      value: [{
        type: 'Expression',
        items: [{
          type: 'Function',
          name: 'linear-gradient',
          prefix: undefined,
          args: [{
            type: 'Expression',
            items: [{
              type: 'Identifier',
              value: 'to',
            }, {
              type: 'Identifier',
              value: 'right',
            }],
          }, {
            type: 'Expression',
            items: [{
              type: 'Identifier',
              value: 'red',
            }],
          }, {
            type: 'Expression',
            items: [{
              type: 'Identifier',
              value: 'blue',
            }],
          }],
        }],
      }],
    }, {
      type: 'Identifier',
      value: 'outline-blue-500',
    }, {
      type: 'Identifier',
      value: 'text-white',
    }])
  })

  it('parses multiple prefixes', () => {
    const input = 'group-hover:before:opacity-100'
    const ast = parse(input)
    expect(ast).toEqual([{
      type: 'Identifier',
      value: 'opacity-100',
      prefix: {
        type: 'Identifier',
        value: 'before',
        prefix: {
          type: 'Identifier',
          value: 'group-hover',
        },
      },
    }])
  })

  it('parses three prefixes', () => {
    const input = 'hover:focus:active:bg-blue-500'
    const ast = parse(input)
    expect(ast).toEqual([{
      type: 'Identifier',
      value: 'bg-blue-500',
      prefix: {
        type: 'Identifier',
        value: 'active',
        prefix: {
          type: 'Identifier',
          value: 'focus',
          prefix: {
            type: 'Identifier',
            value: 'hover',
          },
        },
      },
    }])
  })

  it('parses bracketed prefix', () => {
    const input = '[hover]:bg-red-500'
    const ast = parse(input)
    expect(ast).toEqual([{
      type: 'Identifier',
      value: 'bg-red-500',
      prefix: {
        type: 'BracketedExpression',
        value: [{
          type: 'Expression',
          items: [{
            type: 'Identifier',
            value: 'hover',
          }],
        }],
      },
    }])
  })

  it('parses multiple bracketed prefixes', () => {
    const input = '[hover]:[focus]:bg-green-500'
    const ast = parse(input)
    expect(ast).toEqual([{
      type: 'Identifier',
      value: 'bg-green-500',
      prefix: {
        type: 'BracketedExpression',
        value: [{
          type: 'Expression',
          items: [{
            type: 'Identifier',
            value: 'focus',
          }],
        }],
        prefix: {
          type: 'BracketedExpression',
          value: [{
            type: 'Expression',
            items: [{
              type: 'Identifier',
              value: 'hover',
            }],
          }],
        },
      },
    }])
  })
})
