export default {
  preset: 'ts-jest',
  roots: [
    'lib',
    'packages/vite-plugin-multiline-tailwindcss/src',
  ],
  testMatch: ['**/__tests__/**/*.test.ts?(x)'],
}
