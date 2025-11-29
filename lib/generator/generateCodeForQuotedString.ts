import {QuotedStringNode} from '../parser/QuotedStringNode'

export function generateCodeForQuotedString(node: QuotedStringNode): string {
  return `${node.quote}${node.value}${node.quote}`
}
