import {skipComments} from './skipComments'
import {skipWhitespace} from './skipWhitespace'
import {State} from './State'

export function skipWhitespaceAndComments(state: State) {
  let previousPosition: number
  do {
    previousPosition = state.pos
    skipWhitespace(state)
    skipComments(state)
  } while (state.pos !== previousPosition)
}
