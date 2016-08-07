/* globals module */
module.exports = {
  options: {
    configFile: 'eslint.json'
  },
  target: [
    '<%= paths.src.lint %>',
    '<%= paths.test.lint %>'
  ]
};
