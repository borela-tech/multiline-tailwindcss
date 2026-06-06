import {next} from './next'
import {peek} from './peek'
import {skipWhitespaceAndComments} from './skipWhitespaceAndComments'
import type {State} from './State'

export function skipDelimiters(state: State) {
  if (skipWhitespaceAndComments(state))
    return true

  if (peek(state) === '_') {
    next(state)
    return true
  }

  if (peek(state) === ',') {
    next(state)
    return true
  }

  return false
}
