const path = require('path');

module.exports = (c, a, config) => {
  config.module.rules.push({
    test: [/.tsx?$/, /\.ts$/],
    use: 'ts-loader',
    include: [path.resolve(__dirname, '../src')],
  });

  config.module.rules.push({
    test: /.less$/,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          module: true,
        },
      },
      'less-loader',
    ],
    include: [path.resolve(__dirname, '../src')],
  });

  config.resolve.extensions.push('.ts', '.tsx');

  return config;
};
