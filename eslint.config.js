const pluginCypress = require('eslint-plugin-cypress');
const js = require('eslint-plugin-jsdoc');

modele.exports = [
  js.configs.recommended,
  pluginCypress.configs.recommended,
  {
    languageOptions: {sourceType: 'module'},
    rules: {"no-unused-expressions": "error"},
  },
];

