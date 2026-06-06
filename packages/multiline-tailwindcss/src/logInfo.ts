const BLUE_LOG_TAG = '\x1B[34mMultiline TailwindCSS\x1B[0m'

export function logInfo(message: string) {
  console.log(`${BLUE_LOG_TAG} ${message}`)
}
