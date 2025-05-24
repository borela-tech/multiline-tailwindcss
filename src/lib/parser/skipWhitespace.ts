import {next} from './next'
import {peek} from './peek'
import {State} from './State'

export function skipWhitespace(state: State) {
  while (/\s/.test(peek(state)))
    next(state)
}
