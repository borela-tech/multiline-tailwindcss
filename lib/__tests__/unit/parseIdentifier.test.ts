import {parseIdentifier} from '../../parser/parseIdentifier'
import {State} from '../../parser/State'

describe('parseIdentifier()', () => {
  it('parses a simple identifier', () => {
    const state: State = {input: 'bg-red-500', pos: 0}
    const result = parseIdentifier(state)
    expect(result).toBe('bg-red-500')
    expect(state.pos).toBe(10)
  })

  it('stops at space', () => {
    const state: State = {input: 'bg red', pos: 0}
    const result = parseIdentifier(state)
    expect(result).toBe('bg')
    expect(state.pos).toBe(2)
  })

  it('stops at underscore', () => {
    const state: State = {input: 'bg_red', pos: 0}
    const result = parseIdentifier(state)
    expect(result).toBe('bg')
    expect(state.pos).toBe(2)
  })

  it('stops at comma', () => {
    const state: State = {input: 'bg,red', pos: 0}
    const result = parseIdentifier(state)
    expect(result).toBe('bg')
    expect(state.pos).toBe(2)
  })

  it('stops at colon', () => {
    const state: State = {input: 'bg:red', pos: 0}
    const result = parseIdentifier(state)
    expect(result).toBe('bg')
    expect(state.pos).toBe(2)
  })

  it('stops at opening parenthesis', () => {
    const state: State = {input: 'bg(red)', pos: 0}
    const result = parseIdentifier(state)
    expect(result).toBe('bg')
    expect(state.pos).toBe(2)
  })

  it('stops at closing parenthesis', () => {
    const state: State = {input: 'bg)red', pos: 0}
    const result = parseIdentifier(state)
    expect(result).toBe('bg')
    expect(state.pos).toBe(2)
  })

  it('stops at opening bracket', () => {
    const state: State = {input: 'bg[red]', pos: 0}
    const result = parseIdentifier(state)
    expect(result).toBe('bg')
    expect(state.pos).toBe(2)
  })

  it('stops at closing bracket', () => {
    const state: State = {input: 'bg]red', pos: 0}
    const result = parseIdentifier(state)
    expect(result).toBe('bg')
    expect(state.pos).toBe(2)
  })

  it('handles escape sequences', () => {
    const state: State = {input: 'bg\\ red', pos: 0}
    const result = parseIdentifier(state)
    expect(result).toBe('bg\\ red')
    expect(state.pos).toBe(7)
  })

  it('parses identifier with allowed characters', () => {
    const state: State = {input: 'w-12.5', pos: 0}
    const result = parseIdentifier(state)
    expect(result).toBe('w-12.5')
    expect(state.pos).toBe(6)
  })

  it('stops at end of input', () => {
    const state: State = {input: 'bg', pos: 0}
    const result = parseIdentifier(state)
    expect(result).toBe('bg')
    expect(state.pos).toBe(2)
  })

  it('starts from given position', () => {
    const state: State = {input: 'prefix bg-red', pos: 7}
    const result = parseIdentifier(state)
    expect(result).toBe('bg-red')
    expect(state.pos).toBe(13)
  })
})
