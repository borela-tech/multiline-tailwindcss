import {generate} from './babel/generate'
import {parseTypeScriptCode} from './parseTypeScriptCode'
import {processBase64AssetTag} from './processBase64AssetTag'
import {processTailwindCssTags} from './processTailwindCssTags'

/** @public */
export function transformTaggedStrings(code: string, filePath = 'unknown') {
  const ast = parseTypeScriptCode(code, filePath)

  processBase64AssetTag(filePath, ast)

  const candidatesFound = processTailwindCssTags(filePath, ast)
  const {
    code: transformedCode,
    map: transformedCodeMap,
  } = generate(ast, {}, code)

  return {
    candidatesFound,
    transformedCode: {
      code: transformedCode,
      map: transformedCodeMap,
    },
  }
}
