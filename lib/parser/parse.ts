import {AnyNode} from './AnyNode'
import {BracketedExpression} from './BracketedExpression'
import {IdentifierNode} from './IdentifierNode'
import {next} from './next'
import {parseBracketedExpression} from './parseBracketedExpression'
import {parseFunction} from './parseFunction'
import {parseIdentifierNode} from './parseIdentifierNode'
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

    if (peek(state) === ',') {
      next(state) // Skip ','
      skipWhitespace(state)
      continue
    }

    let node: BracketedExpression | IdentifierNode

    if (peek(state) === '[')
      node = parseBracketedExpression(state)
    else
      node = parseIdentifierNode(state)

    if (peek(state) === ':') {
      next(state)

      const oldNode = node
      node = parseIdentifierNode(state)
      node.prefix = oldNode
    } else {
      if (node.type === 'BracketedExpression') {
        ast.push(node)
        continue
      }
    }

    if (peek(state) === '[') {
      const bracketedExpression = parseBracketedExpression(state, node)
      ast.push(bracketedExpression)
      continue
    }

    if (peek(state) === '(') {
      const functionNode = parseFunction(
        state,
        node.value,
        node.prefix,
      )
      ast.push(functionNode)
      continue
    }

    ast.push(node)
  }

  return ast
}
