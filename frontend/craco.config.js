const CracoBabelLoader = require('craco-babel-loader');

module.exports = {
  plugins: [
    {
      plugin: CracoBabelLoader,
      options: {
        includes: [/(node_modules\/react-markdown)/], // transpile react-markdown
      },
    },
  ],
};
