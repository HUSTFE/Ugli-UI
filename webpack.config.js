const path = require('path');
const os = require('os');
const HappyPack = require('happypack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const rp = file => path.resolve(__dirname, file);

const plugins = [
  new HappyPack({
    id: 'ts',
    threads: os.cpus().length,
    use: [
      {
        path: 'ts-loader',
        query: {
          happyPackMode: true,
          configFile: rp('./tsconfig.json'),
        },
      },
    ],
  }),
  new ForkTsCheckerWebpackPlugin({
    tsconfig: rp('tsconfig.json'),
  }),
  new MiniCssExtractPlugin({
    filename: `ugli/[name].css`,
    chunkFilename: '[id].css',
  }),
];

module.exports = {
  mode: 'production',
  entry: {
    react: './src/components/react/index.ts',
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'ugli.[name].js',
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false, // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['happypack/loader?id=ts'],
        include: [rp('src')],
        exclude: ['/**/__test__/*', 'node_modules'],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              autoprefixer: false,
              minimize: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: function() {
                return [
                  require('autoprefixer')({
                    browsers: ['iOS >= 7', 'android >= 4', 'ie >= 9'],
                  }),
                ];
              },
            },
          },
          {
            loader: 'less-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /font\.(svg|ttf|woff|eot)|\.otf/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: `ugli/iconfont/[name]${hash}.[ext]`,
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|gif|png|svg)$/i,
        use: [
          {
            loader: 'image-webpack-loader',
            options: {
              byPassOnDebug: true,
              mozjpeg: { progressive: true },
              optipng: { optimizationLevel: 3 },
              pngquant: { quality: '65-80' },
            },
          },
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: `ugli/img/[name]${hash}.[ext]`,
            },
          },
        ],
      },
    ],
  },
  plugins: plugins,
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.json'],
    alias: {
      utils: path.resolve(__dirname, 'src/utils'),
      style: path.resolve(__dirname, 'src/style'),
    },
  },
};
