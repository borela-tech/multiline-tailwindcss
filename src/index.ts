import {compileCssPlugin} from './plugins/compileCssPlugin'
import {getConfigOptionsPlugin} from './plugins/getConfigOptionsPlugin'
import {getDevServerPlugin} from './plugins/getDevServerPlugin'
import {Plugin} from 'vite'
import {SharedState} from './plugins/SharedState'
import {transformTaggedStringsPlugin} from './plugins/transformTaggedStringsPlugin'
import {virtualTailwindModulePlugin} from './plugins/virtualTailwindModulePlugin'

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
