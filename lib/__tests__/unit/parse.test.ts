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
    expect(ast).toEqual([
      {
        type: 'BracketedExpression',
        prefix: {
          type: 'Identifier',
          value: 'bg-',
        },
        value: [
          {
            type: 'Expression',
            items: [
              {
                type: 'Function',
                name: 'linear-gradient',
                prefix: undefined,
                args: [
                  {
                    type: 'Expression',
                    items: [
                      {type: 'Identifier', value: 'to'},
                      {type: 'Identifier', value: 'right'},
                    ],
                  },
                  {
                    type: 'Expression',
                    items: [
                      {
                        type: 'Function',
                        name: 'theme',
                        prefix: undefined,
                        args: [
                          {
                            type: 'Expression',
                            items: [{type: 'Identifier', value: 'colors.zinc.900/50%'}],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: 'Expression',
                    items: [
                      {type: 'Identifier', value: 'transparent'},
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ])
  })

  it('parses arbitrary variant with bracketed selector', () => {
    const input = '[&>p]:text-gray-500'
    const ast = parse(input)
    expect(ast).toEqual([
      {
        type: 'Identifier',
        value: 'text-gray-500',
        prefix: {
          type: 'BracketedExpression',
          value: [
            {
              type: 'Expression',
              items: [
                {type: 'Identifier', value: '&>p'},
              ],
            },
          ],
        },
      },
    ])
  })
})
