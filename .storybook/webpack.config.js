const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        include: [resolveApp('src/components/react'), resolveApp('stories')],
        exclude: [resolveApp('src/__tests__')],
        loader: require.resolve('ts-loader'),
      },
      {
        test: /\.less$/,
        include: resolveApp('src/style'),
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 2,
              localIdentName: '[name]__[local]___[hash:base64:5]',
            },
          },
          'less-loader',
        ],
      },
    ],
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.less'],
  },
};
