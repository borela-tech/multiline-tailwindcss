import {generateCodeForNodes} from './generateCodeForNodes'
import {parse} from './parser/parse'

export function transformTailwindClasses(tailwindClasses: string) {
  const nodes = parse(tailwindClasses)
  return generateCodeForNodes(nodes)
}
