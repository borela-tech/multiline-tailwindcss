import {parse} from '../../parser/parse'

describe('parse()', () => {
  it('parses bg-[linear-gradient...] from raw input', () => {
    const INPUT = `
      bg-[
        linear-gradient(
          to_right,
          theme(colors.zinc.900/50%),
          transparent,
        ),
      ],
    `
    const ast = parse(INPUT)
    expect(ast).toEqual([{
      prefix: {
        type: 'Identifier',
        value: 'bg-',
      },
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
    }])
  })

  it('parses input with line comments at the start', () => {
    const INPUT = `
      // Comment at start
      bg-red-500,
      text-blue-600
    `
    const ast = parse(INPUT)
    expect(ast).toEqual([{
      type: 'Identifier',
      value: 'bg-red-500',
    }, {
      type: 'Identifier',
      value: 'text-blue-600',
    }])
  })

  it('parses input with line comments between elements', () => {
    const INPUT = `
      bg-red-500,
      // Comment between
      text-blue-600
    `
    const ast = parse(INPUT)
    expect(ast).toEqual([{
      type: 'Identifier',
      value: 'bg-red-500',
    }, {
      type: 'Identifier',
      value: 'text-blue-600',
    }])
  })

  it('parses input with line comments at the end of the class', () => {
    const INPUT = `
      bg-red-500, // Comment at end of class
      text-blue-600
    `
    const ast = parse(INPUT)
    expect(ast).toEqual([{
      type: 'Identifier',
      value: 'bg-red-500',
    }, {
      type: 'Identifier',
      value: 'text-blue-600',
    }])
  })

  it('parses input with line comments at the end', () => {
    const INPUT = `
      bg-red-500,
      text-blue-600
      // Comment at end
    `
    const ast = parse(INPUT)
    expect(ast).toEqual([{
      type: 'Identifier',
      value: 'bg-red-500',
    }, {
      type: 'Identifier',
      value: 'text-blue-600',
    }])
  })

  it('parses input with block comments at the start', () => {
    const INPUT = `
      /* Block comment */
      bg-red-500,
      text-blue-600
    `
    const ast = parse(INPUT)
    expect(ast).toEqual([{
      type: 'Identifier',
      value: 'bg-red-500',
    }, {
      type: 'Identifier',
      value: 'text-blue-600',
    }])
  })

  it('parses input with block comments between elements', () => {
    const INPUT = `
      bg-red-500,
      /* Block comment */
      text-blue-600
    `
    const ast = parse(INPUT)
    expect(ast).toEqual([{
      type: 'Identifier',
      value: 'bg-red-500',
    }, {
      type: 'Identifier',
      value: 'text-blue-600',
    }])
  })

  it('parses input with block comments at the end of the class', () => {
    const INPUT = `
      bg-red-500, /* Block comment */
      text-blue-600
    `
    const ast = parse(INPUT)
    expect(ast).toEqual([{
      type: 'Identifier',
      value: 'bg-red-500',
    }, {
      type: 'Identifier',
      value: 'text-blue-600',
    }])
  })

  it('parses input with block comments at the end', () => {
    const INPUT = `
      bg-red-500,
      text-blue-600
      /* Block comment */
    `
    const ast = parse(INPUT)
    expect(ast).toEqual([{
      type: 'Identifier',
      value: 'bg-red-500',
    }, {
      type: 'Identifier',
      value: 'text-blue-600',
    }])
  })

  it('parses input with multiline block comments', () => {
    const INPUT = `
      bg-red-500,
      /**
       * This is a multiline
       * block comment
       */
      text-blue-600
    `
    const ast = parse(INPUT)
    expect(ast).toEqual([{
      type: 'Identifier',
      value: 'bg-red-500',
    }, {
      type: 'Identifier',
      value: 'text-blue-600',
    }])
  })

  it('throws error for unclosed block comment', () => {
    const INPUT = `
      bg-red-500,
      /* unclosed comment
      text-blue-600
    `
    expect(() => parse(INPUT)).toThrow(/Unclosed comment/)
  })

  it('parses input with comments inside brackets', () => {
    const INPUT = `
      bg-[
        linear-gradient(/* comment */ to right, red, blue)
      ]
    `
    const ast = parse(INPUT)
    expect(ast).toEqual([{
      prefix: {
        type: 'Identifier',
        value: 'bg-',
      },
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
              type: 'Identifier',
              value: 'red',
            }],
            type: 'Expression',
          }, {
            items: [{
              type: 'Identifier',
              value: 'blue',
            }],
            type: 'Expression',
          }],
          name: 'linear-gradient',
          prefix: undefined,
          type: 'Function',
        }],
        type: 'Expression',
      }],
    }])
  })

  it('parses complex input with mixed comments', () => {
    const INPUT = `
      // Line comment
      bg-[
        /* Block comment */
        linear-gradient(to right, red, blue) // Another line comment
      ],
      outline-blue-500 /* Inline block comment */
      /* Another block */
      text-white
    `
    const ast = parse(INPUT)
    expect(ast).toEqual([{
      prefix: {
        type: 'Identifier',
        value: 'bg-',
      },
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
              type: 'Identifier',
              value: 'red',
            }],
            type: 'Expression',
          }, {
            items: [{
              type: 'Identifier',
              value: 'blue',
            }],
            type: 'Expression',
          }],
          name: 'linear-gradient',
          prefix: undefined,
          type: 'Function',
        }],
        type: 'Expression',
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
    const INPUT = 'group-hover:before:opacity-100'
    const ast = parse(INPUT)
    expect(ast).toEqual([{
      prefix: {
        prefix: {
          type: 'Identifier',
          value: 'group-hover',
        },
        type: 'Identifier',
        value: 'before',
      },
      type: 'Identifier',
      value: 'opacity-100',
    }])
  })

  it('parses three prefixes', () => {
    const INPUT = 'hover:focus:active:bg-blue-500'
    const ast = parse(INPUT)
    expect(ast).toEqual([{
      prefix: {
        prefix: {
          prefix: {
            type: 'Identifier',
            value: 'hover',
          },
          type: 'Identifier',
          value: 'focus',
        },
        type: 'Identifier',
        value: 'active',
      },
      type: 'Identifier',
      value: 'bg-blue-500',
    }])
  })

  it('parses bracketed prefix', () => {
    const INPUT = '[hover]:bg-red-500'
    const ast = parse(INPUT)
    expect(ast).toEqual([{
      prefix: {
        type: 'BracketedExpression',
        value: [{
          items: [{
            type: 'Identifier',
            value: 'hover',
          }],
          type: 'Expression',
        }],
      },
      type: 'Identifier',
      value: 'bg-red-500',
    }])
  })

  it('parses multiple bracketed prefixes', () => {
    const INPUT = '[hover]:[focus]:bg-green-500'
    const ast = parse(INPUT)
    expect(ast).toEqual([{
      prefix: {
        prefix: {
          type: 'BracketedExpression',
          value: [{
            items: [{
              type: 'Identifier',
              value: 'hover',
            }],
            type: 'Expression',
          }],
        },
        type: 'BracketedExpression',
        value: [{
          items: [{
            type: 'Identifier',
            value: 'focus',
          }],
          type: 'Expression',
        }],
      },
      type: 'Identifier',
      value: 'bg-green-500',
    }])
  })

  it('parses id-bracketed prefix like group-aria-[disabled=false]', () => {
    const INPUT = 'group-aria-[disabled=false]:opacity-100'
    const ast = parse(INPUT)
    expect(ast).toEqual([{
      prefix: {
        prefix: {
          type: 'Identifier',
          value: 'group-aria-',
        },
        type: 'BracketedExpression',
        value: [{
          items: [{
            type: 'Identifier',
            value: 'disabled=false',
          }],
          type: 'Expression',
        }],
      },
      type: 'Identifier',
      value: 'opacity-100',
    }])
  })

  it('parses chained prefixes with identifier-bracketed prefix', () => {
    const INPUT = 'group-hover:group-aria-[disabled=false]:opacity-100'
    const ast = parse(INPUT)
    expect(ast).toEqual([{
      prefix: {
        prefix: {
          prefix: {
            type: 'Identifier',
            value: 'group-hover',
          },
          type: 'Identifier',
          value: 'group-aria-',
        },
        type: 'BracketedExpression',
        value: [{
          items: [{
            type: 'Identifier',
            value: 'disabled=false',
          }],
          type: 'Expression',
        }],
      },
      type: 'Identifier',
      value: 'opacity-100',
    }])
  })
})
