import {next} from './next'
import {peek} from './peek'
import {State} from './State'

export function parseIdentifier(state: State): string {
  let value = ''

  while (state.pos < state.input.length) {
    if (/\\/.test(peek(state))) {
      value += next(state)
      value += next(state)
      continue
    }

    if (/[\s,()[\]]/.test(peek(state)))
      break
    value += next(state)
  }

  return value
}
