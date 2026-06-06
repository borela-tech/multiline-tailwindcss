const RED_LOG_TAG = '\x1B[31mMultiline TailwindCSS\x1B[0m'

/** @public */
export function logError(message: string, error?: unknown) {
  if (error)
    console.error(`${RED_LOG_TAG} ${message}`, error)
  else
    console.error(`${RED_LOG_TAG} ${message}`)
}
