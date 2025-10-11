import {parse} from '../../parser/parse'

describe('parse()', () => {
  it.only('parses bg-[linear-gradient...] from raw input', () => {
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
    expect(ast).toHaveLength(1)
    expect(ast[0]).toEqual({
      type: 'BracketedExpression',
      name: 'bg-',
      value: [
        {
          type: 'Expression',
          items: [
            {
              type: 'Function',
              name: 'linear-gradient',
              pseudoElement: undefined,
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
                      pseudoElement: undefined,
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
                  items: [{type: 'Identifier', value: 'transparent'}],
                },
              ],
            },
          ],
        },
      ],
    })
  })
})
