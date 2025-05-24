import {next} from './next'
import {peek} from './peek'
import {State} from './State'

export function parseIdentifier(state: State): string {
  let value = ''

  while (state.pos < state.input.length) {
    if (/[\s,()\[\]]/.test(peek(state)))
      break
    value += next(state)
  }

  return value
}
