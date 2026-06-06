import type * as t from '@babel/types'

export function getQuasiText(quasi: t.TemplateElement) {
  return quasi.value.cooked
    ?? quasi.value.raw
}
