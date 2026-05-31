const RED_LOG_TAG = '\x1b[31mMultiline tailwindcss\x1b[0m'

export function logError(message: string, error: Error) {
  console.error(`${RED_LOG_TAG} ${message}`, error)
}
