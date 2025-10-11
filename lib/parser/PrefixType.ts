import {BracketedExpression} from './BracketedExpression'
import {IdentifierNode} from '@/lib/parser/IdentifierNode'

export type PrefixType =
  | BracketedExpression
  | IdentifierNode
