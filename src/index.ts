import {compileCssPlugin} from './plugins/compileCssPlugin'
import {getConfigOptionsPlugin} from './plugins/getConfigOptionsPlugin'
import {getDevServerPlugin} from './plugins/getDevServerPlugin'
import {Plugin} from 'vite'
import {SharedState} from './plugins/SharedState'
import {transformJsxCssClassesPlugin} from './plugins/transformJsxCssClassesPlugin'
import {transformTaggedStringsPlugin} from './plugins/transformTaggedStringsPlugin'
import {virtualTailwindModulePlugin} from './plugins/virtualTailwindModulePlugin'

export function multilineTailwind() {
  const state: SharedState = {
    candidates: {
      className: new Map(),
      tagged: new Map(),
    },
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
    transformJsxCssClassesPlugin(state),
    compileCssPlugin(state),
  ] as Plugin[]
}
