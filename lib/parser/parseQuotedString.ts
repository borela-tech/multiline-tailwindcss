import {next} from './next'
import {peek} from './peek'
import {QuotedStringNode} from './QuotedStringNode'
import {State} from './State'

export function parseQuotedString(state: State): QuotedStringNode {
  const quote = next(state)
  let closed = false
  let value = ''

  while (state.pos < state.input.length) {
    const ch = next(state)

    if (ch === '\\') {
      // Remove escape from quotes used in the string.
      if (peek(state) === quote) {
        value += next(state)
        continue
      }

      value += ch + next(state)
      continue
    }

    if (ch === quote) {
      closed = true
      break
    }

    if (ch === ' ')
      value += '_'
    else
      value += ch
  }

  if (!closed)
    throw new Error(`Unclosed quoted string starting at position ${state.pos}`)

  return {
    type: 'QuotedString',
    value,
    quote,
  }
}
