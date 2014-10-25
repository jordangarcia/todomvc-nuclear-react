module.exports = {
  entry: './src/main.js',
  output: {
    filename: './dist/todomvc.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "jsx-loader"
      },
      {
        test: /\.js$/,
        loader: 'jstransform-loader'
      },
    ]
  },
};
