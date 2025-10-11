import {parseBracketedExpression} from '../../parser/parseBracketedExpression'
import {PrefixType} from '../../parser/PrefixType'
import {State} from '../../parser/State'

describe('parseBracketedExpression()', () => {
  it('parses simple bracketed expression', () => {
    const state: State = {input: '[bg]', pos: 0}
    const result = parseBracketedExpression(state)
    expect(result).toEqual({
      type: 'BracketedExpression',
      value: [
        {
          type: 'Expression',
          items: [{type: 'Identifier', value: 'bg'}],
        },
      ],
    })
    expect(state.pos).toBe(4)
  })

  it('parses bracketed expression with name', () => {
    const state: State = {input: '[bg red]', pos: 0}
    const prefix = {type: 'Identifier', value: 'test'} as PrefixType
    const result = parseBracketedExpression(state, prefix)
    expect(result).toEqual({
      type: 'BracketedExpression',
      prefix,
      value: [
        {
          type: 'Expression',
          items: [
            {type: 'Identifier', value: 'bg'},
            {type: 'Identifier', value: 'red'},
          ],
        },
      ],
    })
    expect(state.pos).toBe(8)
  })

  it('parses complex bracketed expression', () => {
    const state: State = {input: '[color:red rgb(255,0,0)]', pos: 0}
    const result = parseBracketedExpression(state)
    expect(result).toEqual({
      type: 'BracketedExpression',
      value: [
        {
          type: 'Expression',
          items: [
            {
              type: 'CssProperty',
              name: 'color',
              value: {
                type: 'Expression',
                items: [
                  {type: 'Identifier', value: 'red'},
                  {
                    type: 'Function',
                    name: 'rgb',
                    args: [
                      {type: 'Expression', items: [{type: 'Identifier', value: '255'}]},
                      {type: 'Expression', items: [{type: 'Identifier', value: '0'}]},
                      {type: 'Expression', items: [{type: 'Identifier', value: '0'}]},
                    ],
                  },
                ],
              },
            },
          ],
        },
      ],
    })
    expect(state.pos).toBe(24)
  })

  it('handles empty brackets', () => {
    const state: State = {input: '[]', pos: 0}
    const result = parseBracketedExpression(state)
    expect(result).toEqual({
      type: 'BracketedExpression',
      value: [],
    })
    expect(state.pos).toBe(2)
  })

  it('parses bracketed expression with linear-gradient', () => {
    const state: State = {input: '[linear-gradient(to_right,theme(colors.zinc.900/50%),transparent)]', pos: 0}
    const result = parseBracketedExpression(state)
    expect(result).toEqual({
      type: 'BracketedExpression',
      name: undefined,
      value: [
        {
          type: 'Expression',
          items: [
            {
              type: 'Function',
              name: 'linear-gradient',
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
    expect(state.pos).toBe(66)
  })

  it('parses multiple expressions separated by comma', () => {
    const state: State = {input: '[bg, red]', pos: 0}
    const result = parseBracketedExpression(state)
    expect(result).toEqual({
      type: 'BracketedExpression',
      value: [
        {
          type: 'Expression',
          items: [{type: 'Identifier', value: 'bg'}],
        },
        {
          type: 'Expression',
          items: [{type: 'Identifier', value: 'red'}],
        },
      ],
    })
    expect(state.pos).toBe(9)
  })

  it('starts from given position', () => {
    const state: State = {input: 'prefix[bg]', pos: 6}
    const result = parseBracketedExpression(state)
    expect(result).toEqual({
      type: 'BracketedExpression',
      value: [
        {
          type: 'Expression',
          items: [{type: 'Identifier', value: 'bg'}],
        },
      ],
    })
    expect(state.pos).toBe(10)
  })
})
