const RED_LOG_TAG = '\x1B[31mMultiline tailwindcss\x1B[0m'

export function logError(message: string, error: Error) {
  console.error(`${RED_LOG_TAG} ${message}`, error)
}
