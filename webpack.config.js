var ExtractTextPlugin = require('extract-text-webpack-plugin');

const path = require('path')

const PATHS = {
  src: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'build'),
}

module.exports = {
  context: __dirname,
  entry: './src/app.js',
  output: {
    path: PATHS.build,
    filename: "bundle.js"
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: PATHS.src,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react', 'stage-1']
        }
      },
      {
        test: /\.css$/,
        include: PATHS.src,
        loaders: [
          'style',
          'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
        ]
      }
    ]
  }
};
