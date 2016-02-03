var ExtractTextPlugin = require('extract-text-webpack-plugin');

const path = require('path')

const PATHS = {
  build: path.join(__dirname, 'build'),
  client: path.join(__dirname, 'src', 'client'),
  server: path.join(__dirname, 'src', 'server'),
  test: path.join(__dirname, 'test')
}

// Configure css-loader so I can use CSS modules and have somewhat identifable
// hashes for class names to facilitate debugging
const cssLoader = 'css-loader?modules' +
  '&importLoaders=1' +
  '&localIdentName=[name]__[local]___[hash:base64:5]'

module.exports = {
  devtool: 'source-map',  // Helpful for debugging
  entry: path.join(PATHS.client, 'index.js'),
  output: {
    path: PATHS.build,
    filename: "bundle.js"
  },
  resolve: {
    // Automagically figure out the extension in import statements
    extensions: ['', '.js', '.jsx']
  },
  module: {
    preLoaders: [
      {
        // Yell at me if there are lint issues
        test: /\.jsx?$/,
        loaders: ['eslint'],
        include: [PATHS.client, PATHS.server, PATHS.test]
      }
    ],
    loaders: [
      {
        // Lets me use ES6+ in my code!
        test: /\.jsx?$/,
        include: [PATHS.client, PATHS.server],
        loader: 'babel',
        query: {
          presets: ['es2015', 'react', 'stage-1']
        }
      },
      {
        // Let me use CSS modules!
        test: /\.css$/,
        include: PATHS.client,
        loader: ExtractTextPlugin.extract('style-loader', cssLoader)
      }
    ]
  },
  plugins: [
    // Bundle-up my css and output into one file
    new ExtractTextPlugin('style.css', { allChunks: true }),
  ]
};
