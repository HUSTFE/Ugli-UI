// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.
const path = require('path')
const fs = require('fs')
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)

module.exports = {
  plugins: [
    new ExtractTextPlugin({ filename: 'styles.css', allChunks: true }),
  ],
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      include: [resolveApp('src/components/react'), resolveApp('stories')],
      loader: require.resolve('babel-loader'),
      options: {
        // This is a feature of `babel-loader` for webpack (not Babel itself).
        // It enables caching results in ./node_modules/.cache/babel-loader/
        // directory for faster rebuilds.
        cacheDirectory: true,
      },
    }, {
      test: /\.(sass|scss)$/,
      include: resolveApp('src/style'),
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 2,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          },
          'sass-loader'
        ]
      })
    }],
  },
  resolve: {
    modules: [
      'node_modules',
    ],
    extensions: ['.js', '.jsx', '.sass', '.scss'],
    alias: {
      '@style': resolveApp('src/style'),
      '@shared': resolveApp('src/components/shared'),
    },
  },
}
