import '@/lib/tailwindcss'
import {compileCssPlugin} from './compileCssPlugin'
import {Config} from './Config'
import {initialize} from './initialize'
import {Plugin} from 'vite'
import {SharedState} from './SharedState'
import {transformJsxCssClassesPlugin} from './transformJsxCssClassesPlugin'
import {transformTaggedStringsPlugin} from './transformTaggedStringsPlugin'

export function multilineTailwindCss(config?: Config) {
  const state: SharedState = {
    candidatesFromTransforms: {
      className: new Map(),
      tagged: new Map(),
      ...config,
    },
  }
  return [
    initialize(state),
    transformTaggedStringsPlugin(state),
    transformJsxCssClassesPlugin(state),
    compileCssPlugin(state),
  ] satisfies Plugin[]
}
