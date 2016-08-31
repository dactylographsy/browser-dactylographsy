/* globals module */
module.exports = {
  options: {
    configFile: '.eslintrc'
  },
  target: [
    '<%= paths.src.lint %>',
    '<%= paths.test.lint %>'
  ]
};
