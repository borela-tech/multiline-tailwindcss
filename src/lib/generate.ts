// TODO: Remove this workaround when Babel modules get fixed.
import generatorModuleOrFunction from '@babel/generator'

let generate = generatorModuleOrFunction

if (typeof generatorModuleOrFunction != 'function')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  generate = (generatorModuleOrFunction as any).default as typeof generatorModuleOrFunction

export {generate}
