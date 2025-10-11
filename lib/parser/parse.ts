import {AnyNode} from './AnyNode'
import {IdentifierNode} from './IdentifierNode'
import {next} from './next'
import {parseBracketedExpression} from './parseBracketedExpression'
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
      const node = parseBracketedExpression(state)
      ast.push(node)
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
      const node = parseBracketedExpression(state, identifier)
      if (pseudoElement)
        node.pseudoElement = pseudoElement
      ast.push(node)
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
