import {Node} from './Node'

export function parse(input: string): Node[] {
  const ast: Node[] = []
  let pos = 0

  function next(): string {
    return input[pos++]
  }

  function parseArray(): Node[] {
    const items: Node[] = []
    next() // skip '['

    while (pos < input.length && peek() !== ']') {
      skipWhitespace()
      if (peek() === ']')
        break

      items.push(parseExpression())

      skipWhitespace()
      if (peek() === ',')
        next()
    }

    next() // skip ']'
    return items
  }

  function parseExpression(): Node {
    skipWhitespace()
    const identifier = parseIdentifier()
    skipWhitespace()

    if (peek() === '(')
      return parseFunction(identifier)

    return {
      type: 'Identifier',
      value: identifier
    }
  }

  function parseFunction(name: string): Node {
    const args: Node[] = []
    next() // skip '('

    while (pos < input.length && peek() !== ')') {
      skipWhitespace()
      if (peek() === ')')
        break

      args.push(parseExpression())

      skipWhitespace()
      if (peek() === ',')
        next()
    }

    next() // skip ')'

    const suffix = parseSuffix()
    return {
      type: 'Function',
      name,
      args,
      suffix,
    }
  }

  function parseIdentifier(): string {
    let value = ''
    while (pos < input.length && /[^()\[\],\s]/.test(peek()))
      value += next()
    return value
  }

  function parseSuffix(): string {
    let value = ''
    while (pos < input.length && /[^\s,()\[\]]/.test(peek()))
      value += next()
    return value
  }

  function peek(): string {
    return input[pos]
  }

  function skipWhitespace() {
    while (/\s/.test(peek()))
      next()
  }

  while (pos < input.length) {
    skipWhitespace()
    const start = pos
    const identifier = parseIdentifier()
    skipWhitespace()

    if (peek() === '[') {
      const items = parseArray()
      const suffix = parseSuffix()
      ast.push({
        type: 'NamedArray',
        name: identifier,
        items,
        suffix,
      })
      continue
    }

    if (peek() === '(') {
      ast.push(parseFunction(identifier))
      continue
    }

    if (identifier) {
      ast.push({
        type: 'Identifier',
        value: identifier,
      })
    }
  }

  return ast
}
