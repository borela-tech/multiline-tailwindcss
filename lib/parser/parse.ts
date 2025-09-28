import {AnyNode} from './AnyNode'
import {CustomValueNode} from './CustomValueNode'
import {IdentifierNode} from './IdentifierNode'
import {next} from './next'
import {parseCustomValue} from './parseCustomValue'
import {parseFunction} from './parseFunction'
import {parseIdentifier} from './parseIdentifier'
import {peek} from './peek'
import {skipWhitespace} from './skipWhitespace'
import {State} from './State'

export function parse(input: string): AnyNode[] {
  const ast: AnyNode[] = []
  const state: State = {
    input,
    pos: 0,
  }

  while (state.pos < state.input.length) {
    skipWhitespace(state)

    if (peek(state) === '[') {
      const items = parseCustomValue(state)
      const suffix = parseIdentifier(state)
      const customValueNode: AnyNode = {
        items,
        name: undefined,
        suffix,
        type: 'CustomValue',
      }
      ast.push(customValueNode)
      continue
    }

    let pseudoElement: string | undefined = undefined
    let identifier = parseIdentifier(state)

    if (peek(state) === ':') {
      next(state) // Skip ':'
      pseudoElement = identifier
      identifier = parseIdentifier(state)
    }

    if (peek(state) === '[') {
      const items = parseCustomValue(state)
      const suffix = parseIdentifier(state)
      const customValueNode: CustomValueNode = {
        items,
        name: identifier,
        pseudoElement,
        suffix,
        type: 'CustomValue',
      }
      ast.push(customValueNode)
      continue
    }

    if (peek(state) === '(') {
      const functionNode = parseFunction(
        state,
        identifier,
        pseudoElement,
      )
      ast.push(functionNode)
      continue
    }

    const identifierNode: IdentifierNode = {
      pseudoElement,
      type: 'Identifier',
      value: identifier,
    }
    ast.push(identifierNode)
  }

  return ast
}
