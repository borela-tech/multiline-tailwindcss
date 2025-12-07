import {skipComments} from './skipComments'
import {skipWhitespace} from './skipWhitespace'
import {State} from './State'

export function skipWhitespaceAndComments(state: State) {
  const initialStatePosition = state.pos
  let previousPosition: number
  do {
    previousPosition = state.pos
    skipWhitespace(state)
    skipComments(state)
  } while (state.pos !== previousPosition)
  return state.pos != initialStatePosition
}
