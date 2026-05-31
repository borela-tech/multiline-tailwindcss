const BLUE_LOG_TAG = '\x1b[34mMultiline tailwindcss\x1b[0m'

export function logInfo(message: string) {
  console.log(`${BLUE_LOG_TAG} ${message}`)
}
