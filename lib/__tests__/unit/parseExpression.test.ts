import {parseExpression} from '../../parser/parseExpression'
import {State} from '../../parser/State'

describe('parseExpression()', () => {
  it('parses simple identifiers separated by spaces', () => {
    const state: State = {input: 'bg red', pos: 0}
    const result = parseExpression(state)
    expect(result.type).toBe('Expression')
    expect(result.items).toHaveLength(2)
    expect(result.items[0]).toEqual({type: 'Identifier', value: 'bg'})
    expect(result.items[1]).toEqual({type: 'Identifier', value: 'red'})
    expect(state.pos).toBe(6)
  })

  it('parses CSS property', () => {
    const state: State = {input: 'color:red', pos: 0}
    const result = parseExpression(state)
    expect(result.type).toBe('Expression')
    expect(result.items).toHaveLength(1)
    expect(result.items[0]).toEqual({
      type: 'CssProperty',
      name: 'color',
      value: {
        type: 'Expression',
        items: [{type: 'Identifier', value: 'red'}],
      },
    })
    expect(state.pos).toBe(9)
  })

  it('parses function', () => {
    const state: State = {input: 'rgb(255,0,0)', pos: 0}
    const result = parseExpression(state)
    expect(result.type).toBe('Expression')
    expect(result.items).toHaveLength(1)
    expect(result.items[0]).toEqual({
      type: 'Function',
      name: 'rgb',
      args: [
        {type: 'Expression', items: [{type: 'Identifier', value: '255'}]},
        {type: 'Expression', items: [{type: 'Identifier', value: '0'}]},
        {type: 'Expression', items: [{type: 'Identifier', value: '0'}]},
      ],
    })
    expect(state.pos).toBe(12)
  })

  it('parses mixed expression', () => {
    const state: State = {input: 'bg color:red rgb(255,0,0)', pos: 0}
    const result = parseExpression(state)
    expect(result.type).toBe('Expression')
    expect(result.items).toHaveLength(2)
    expect(result.items[0]).toEqual({type: 'Identifier', value: 'bg'})
    expect(result.items[1]).toEqual({
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
    })
    expect(state.pos).toBe(25)
  })

  it('stops at comma', () => {
    const state: State = {input: 'bg, red', pos: 0}
    const result = parseExpression(state)
    expect(result.items).toHaveLength(1)
    expect(result.items[0]).toEqual({type: 'Identifier', value: 'bg'})
    expect(state.pos).toBe(2)
  })

  it('stops at closing parenthesis', () => {
    const state: State = {input: 'bg) red', pos: 0}
    const result = parseExpression(state)
    expect(result.items).toHaveLength(1)
    expect(result.items[0]).toEqual({type: 'Identifier', value: 'bg'})
    expect(state.pos).toBe(2)
  })

  it('stops at closing bracket', () => {
    const state: State = {input: 'bg] red', pos: 0}
    const result = parseExpression(state)
    expect(result.items).toHaveLength(1)
    expect(result.items[0]).toEqual({type: 'Identifier', value: 'bg'})
    expect(state.pos).toBe(2)
  })

  it('skips underscores', () => {
    const state: State = {input: 'bg_red blue', pos: 0}
    const result = parseExpression(state)
    expect(result.items).toHaveLength(3)
    expect(result.items[0]).toEqual({type: 'Identifier', value: 'bg'})
    expect(result.items[1]).toEqual({type: 'Identifier', value: 'red'})
    expect(result.items[2]).toEqual({type: 'Identifier', value: 'blue'})
    expect(state.pos).toBe(11)
  })

  it('parses complex linear-gradient expression', () => {
    const state: State = {
      input: 'linear-gradient(to_right,theme(colors.zinc.900/50%),transparent)',
      pos: 0,
    }
    const result = parseExpression(state)
    expect(result.type).toBe('Expression')
    expect(result.items).toHaveLength(1)
    expect(result.items[0]).toEqual({
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
    })
    expect(state.pos).toBe(64)
  })

  it('handles empty expression', () => {
    const state: State = {input: '', pos: 0}
    const result = parseExpression(state)
    expect(result.type).toBe('Expression')
    expect(result.items).toHaveLength(0)
    expect(state.pos).toBe(0)
  })

  it('handles whitespace correctly', () => {
    // Leading whitespace
    let state: State = {input: '  bg red', pos: 0}
    let result = parseExpression(state)
    expect(result.items).toHaveLength(2)
    expect(result.items[0]).toEqual({type: 'Identifier', value: 'bg'})
    expect(result.items[1]).toEqual({type: 'Identifier', value: 'red'})
    expect(state.pos).toBe(8)

    // Multiple spaces between items
    state = {input: 'bg   red', pos: 0}
    result = parseExpression(state)
    expect(result.items).toHaveLength(2)
    expect(result.items[0]).toEqual({type: 'Identifier', value: 'bg'})
    expect(result.items[1]).toEqual({type: 'Identifier', value: 'red'})
    expect(state.pos).toBe(8)
  })
})
