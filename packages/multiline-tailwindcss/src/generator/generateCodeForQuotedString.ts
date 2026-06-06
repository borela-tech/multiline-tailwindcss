import type {QuotedStringNode} from '../QuotedStringNode'

export function generateCodeForQuotedString(node: QuotedStringNode): string {
  const value = node.value
    .replaceAll(node.quote, `\\${node.quote}`)
  return `${node.quote}${value}${node.quote}`
}
