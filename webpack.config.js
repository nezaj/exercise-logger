module.exports = {
  context: __dirname,
  entry: './src/app.js',
  output: {
    path: "./build",
    filename: "bundle.js"
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel',
          query: {
            presets: ['es2015', 'react', 'stage-1']
          }
        }
      ]
    }
};
