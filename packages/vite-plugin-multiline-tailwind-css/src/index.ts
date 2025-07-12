import '@/lib/tailwind'
import {compileCssPlugin} from './compileCssPlugin'
import {initialize} from './initialize'
import {Plugin} from 'vite'
import {SharedState} from './SharedState'
import {transformJsxCssClassesPlugin} from './transformJsxCssClassesPlugin'
import {transformTaggedStringsPlugin} from './transformTaggedStringsPlugin'

export function multilineTailwind() {
  const state: SharedState = {
    candidatesFromTransforms: {
      className: new Map(),
      tagged: new Map(),
    },
  }
  return [
    initialize(state),
    transformTaggedStringsPlugin(state),
    transformJsxCssClassesPlugin(state),
    compileCssPlugin(state),
  ] satisfies Plugin[]
}
