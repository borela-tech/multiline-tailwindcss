import {State} from './State'

export function peek(state: State): string {
  return state.input[state.pos]
}
