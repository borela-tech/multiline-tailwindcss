import {CustomValueNodeItem} from './CustomValueNodeItem'
import {next} from './next'
import {parseExpression} from './parseExpression'
import {peek} from './peek'
import {skipWhitespace} from './skipWhitespace'
import {State} from './State'

export function parseCustomValue(state: State): CustomValueNodeItem[] {
  const items: CustomValueNodeItem[] = []
  next(state) // Skip '['

  while (state.pos < state.input.length) {
    skipWhitespace(state)
    if (peek(state) === ']')
      break

    items.push(parseExpression(state))

    skipWhitespace(state)
    if (peek(state) === ',')
      next(state)
  }

  next(state) // Skip ']'
  return items
}
