const pluginCypress = require('eslint-plugin-cypress');
const js = require('@eslint/js');

module.exports = [
  js.configs.recommended,
  pluginCypress.configs.recommended,
  {
    languageOptions: {sourceType: 'module'},
    rules: {"no-unused-expressions": "error"},
  },
  {
    files: ['*.config.js'],
    languageOptions: { sourceType: 'commonjs', globals: require('globals').node },
  }
];

