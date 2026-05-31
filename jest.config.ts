const jestConfig = {
  moduleNameMapper: {
    '^@lib/(.*)$': '<rootDir>/lib/$1',
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': '@swc/jest',
  },
}

export {jestConfig as default}
