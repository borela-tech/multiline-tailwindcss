import {next} from './next'
import {QuotedStringNode} from './QuotedStringNode'
import {State} from './State'

export function parseQuotedString(state: State): QuotedStringNode {
  const quote = next(state)
  let value = ''

  while (state.pos < state.input.length) {
    const ch = next(state)

    if (ch === '\\') {
      value += next(state)
      continue
    }

    if (ch === quote)
      break

    value += ch
  }

  return {
    type: 'QuotedString',
    value,
    quote,
  }
}
