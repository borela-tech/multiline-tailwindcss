import {AnyNode} from './AnyNode'
import {next} from './next'
import {parseBracketedExpression} from './parseBracketedExpression'
import {parseFunction} from './parseFunction'
import {parseIdentifierNode} from './parseIdentifierNode'
import {peek} from './peek'
import {skipWhitespace} from './skipWhitespace'
import {State} from './State'

export function parse(input: string): AnyNode[] {
  const ast: AnyNode[] = []
  const state: State = {input, pos: 0}

  while (state.pos < state.input.length) {
    skipWhitespace(state)

    if (peek(state) === ',') {
      next(state) // Skip ','
      skipWhitespace(state)
      continue
    }

    let node =
      peek(state) === '['
        ? parseBracketedExpression(state)
        : parseIdentifierNode(state)

    if (peek(state) === ':') {
      next(state)
      const prefix = node
      node = parseIdentifierNode(state)
      node.prefix = prefix
    } else if (node.type === 'BracketedExpression') {
      ast.push(node)
      continue
    }

    if (peek(state) === '[') {
      ast.push(parseBracketedExpression(state, node))
      continue
    }

    if (peek(state) === '(') {
      ast.push(parseFunction(state, node.value, node.prefix))
      continue
    }

    ast.push(node)
  }

  return ast
}
