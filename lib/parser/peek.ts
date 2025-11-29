import {State} from './State'

export function peek(
  state: State,
  length = 1,
): string {
  return state.input.slice(
    state.pos,
    state.pos + length,
  )
}
