import {State} from './State'

export function next(state: State): string {
  return state.input[state.pos++]
}
