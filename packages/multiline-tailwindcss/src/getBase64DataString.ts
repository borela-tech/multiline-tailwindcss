import fs from 'node:fs'
import path from 'node:path'

const MIME_TYPES: Record<string, string> = {
  '.apng': 'image/apng',
  '.avif': 'image/avif',
  '.bmp': 'image/bmp',
  '.cur': 'image/x-win-bitmap',
  '.eot': 'application/vnd.ms-fontobject',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.otc': 'font/collection',
  '.otf': 'font/otf',
  '.pdf': 'application/pdf',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.svgz': 'image/svg+xml',
  '.tif': 'image/tiff',
  '.tiff': 'image/tiff',
  '.ttc': 'font/collection',
  '.ttf': 'font/ttf',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
}

export function getBase64DataString(targetPath: string, sourceFile: string) {
  const ext = path.extname(targetPath).toLowerCase()
  const mime = MIME_TYPES[ext]

  if (!mime)
    throw new Error(`Unsupported file extension: ${ext}`)

  const sourceDirectoryPath = path.dirname(sourceFile ?? '')
  const resolved = path.resolve(sourceDirectoryPath, targetPath)
  const buffer = fs.readFileSync(resolved)
  const base64String = buffer.toString('base64')

  return `data:${mime};base64,${base64String}`
}
