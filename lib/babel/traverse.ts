// TODO: Remove this workaround when Babel modules get fixed.
import traverseModuleOrFunction from '@babel/traverse'

export let traverse = traverseModuleOrFunction

if (typeof traverseModuleOrFunction != 'function')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  traverse = (traverseModuleOrFunction as any).default as typeof traverseModuleOrFunction
