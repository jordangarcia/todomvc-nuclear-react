module.exports = {
  entry: './src/main.js',
  output: {
    filename: './dist/todomvc.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loader: 'jsx-loader?insertPragma=React.DOM'
      },
      {
        test: /\.js$/,
        loader: 'jstransform-loader'
      },
    ]
  },
};
