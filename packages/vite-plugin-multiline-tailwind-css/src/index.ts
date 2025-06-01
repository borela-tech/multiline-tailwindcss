import {compileCssPlugin} from './compileCssPlugin'
import {initialize} from './initialize'
import {Plugin} from 'vite'
import {SharedState} from './SharedState'
import {transformJsxCssClassesPlugin} from './transformJsxCssClassesPlugin'
import {transformTaggedStringsPlugin} from './transformTaggedStringsPlugin'
import {virtualTailwindModulePlugin} from './virtualTailwindModulePlugin'

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
    initialize(state),
    virtualTailwindModulePlugin(state),
    transformTaggedStringsPlugin(state),
    transformJsxCssClassesPlugin(state),
    compileCssPlugin(state),
  ] satisfies Plugin[]
}

export {}
declare global {
  function tailwind(
    strings: TemplateStringsArray,
    ...expressions: unknown[]
  ): string
}
