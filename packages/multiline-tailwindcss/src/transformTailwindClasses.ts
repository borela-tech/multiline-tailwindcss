import {generateCodeForNodes} from './generator/generateCodeForNodes'
import {parseTailwindCssClasses} from './parseTailwindCssClasses'

export function transformTailwindClasses(tailwindClasses: string) {
  const nodes = parseTailwindCssClasses(tailwindClasses)
  return generateCodeForNodes(nodes)
}
