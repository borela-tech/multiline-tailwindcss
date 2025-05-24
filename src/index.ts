import {compileCssPlugin} from './plugins/compileCssPlugin'
import {Plugin} from 'vite'
import {SharedState} from './plugins/SharedState'
import {transformTaggedStringsPlugin} from './plugins/transformTaggedStringsPlugin'
import {getDevServerPlugin} from './plugins/getDevServerPlugin'
import {virtualTailwindModulePlugin} from './plugins/virtualTailwindModulePlugin'
import {getConfigOptionsPlugin} from './plugins/getConfigOptionsPlugin'

export function multilineTailwind() {
  const state: SharedState = {
    candidatesPerId: new Map(),
    devServer: undefined,
    projectRoot: undefined,
    virtualTailwindModule: {
      id: 'virtual:tailwind.css',
      resolvedId: '\0virtual:tailwind.css',
    },
  }
  return [
    getConfigOptionsPlugin(state),
    getDevServerPlugin(state),
    virtualTailwindModulePlugin(state),
    transformTaggedStringsPlugin(state),
    compileCssPlugin(state),
  ] as Plugin[]
}
