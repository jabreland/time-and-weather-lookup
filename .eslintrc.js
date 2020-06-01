module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  extends: ['prettier', '@invisible'],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 6,
  },
}
