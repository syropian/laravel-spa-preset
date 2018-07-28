module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
    ecmaVersion: 8,
    allowImportExportEverywhere: true
  },
  extends: ['standard', 'plugin:vue/recommended'],
  plugins: ['vue'],
  rules: {
    'vue/require-default-prop': 'off',
    'vue/require-prop-types': 'off',
    'vue/html-self-closing': 'off'
  },
  overrides: [
    {
      files: ['**/*.test.js'],
      env: {
        jest: true
      }
    }
  ]
}
