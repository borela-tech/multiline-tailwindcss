import {next} from './next'
import {peek} from './peek'
import type {State} from './State'

export function skipWhitespace(state: State) {
  while (/\s/.test(peek(state)))
    next(state)
}
