import {next} from './next'
import {peek} from './peek'
import {State} from './State'

function skipLineComment(state: State) {
  next(state) // Skip /
  next(state) // Skip /

  while (state.pos < state.input.length && peek(state) !== '\n')
    next(state)

  if (peek(state) == '\n')
    next(state)
}

function skipBlockComment(state: State) {
  next(state) // Skip /
  next(state) // Skip *

  let closed = false
  while (state.pos < state.input.length) {
    if (peek(state, 2) === '*/') {
      next(state) // Skip *
      next(state) // Skip /
      closed = true
      break
    }
    next(state)
  }

  if (!closed)
    throw new Error('Unclosed comment')
}

function skipHashComment(state: State) {
  next(state) // Skip #

  while (state.pos < state.input.length && peek(state) !== '\n')
    next(state)

  if (peek(state) == '\n')
    next(state)
}

export function skipComments(state: State) {
  if (peek(state, 2) === '//')
    skipLineComment(state)
  else if (peek(state, 2) === '/*')
    skipBlockComment(state)
  else if (peek(state) === '#')
    skipHashComment(state)
}
