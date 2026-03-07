import {next} from './next'
import {parseExpression} from './parseExpression'
import type {AnyNode} from './AnyNode'
import type {CssPropertyNode} from './CssPropertyNode'
import type {State} from './State'

export function parseCssProperty(
  state: State,
  name: string,
  prefix?: AnyNode,
): CssPropertyNode {
  next(state) // Skip ':'
  const value = parseExpression(state)
  return {
    name,
    prefix,
    type: 'CssProperty',
    value,
  }
}
