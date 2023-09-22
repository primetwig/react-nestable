const webpack = require('webpack');
const yargs = require('yargs');
const path = require('path');

const argv = yargs
  .boolean('p')
  .alias('p', 'optimize-minimize')
  .argv;

module.exports = {
  entry: {
    example: path.join(__dirname, 'src', 'example', 'example.tsx'),
  },

  output: {
    path: path.join(__dirname, 'dist', 'example'),
    filename: '[name].js',
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  ['postcss-preset-env'],
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        type: 'asset/inline',
      },
    ],
  },

  resolve: {
    // when calling: import './some/path/to/file',
    // if multiple files share the same name but have different extensions,
    // webpack will resolve the one with the extension listed first in the array and skip the rest.
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.css'],
  },

  mode: argv.p ? 'production' : 'development',
  devtool: argv.p ? 'inline-source-map' : 'eval-cheap-source-map',
  devServer: {
    static: {
      directory: path.resolve(__dirname, './dist/example')
    },
    hot: true,
  },
  stats: {
    colors: true,
  },

  plugins: (function () {
    const plugins = [];

    if (argv.p) {
      // prod mode
      plugins.push(new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        // compress: {
        //   warnings: false
        // },
      }));
      plugins.push(new webpack.optimize.AggressiveMergingPlugin());
    } else {
      // dev mode
      plugins.push(new webpack.HotModuleReplacementPlugin());
      plugins.push(new webpack.NoEmitOnErrorsPlugin());
      plugins.push(new webpack.LoaderOptionsPlugin({debug: true}));
    }

    return plugins;
  })(),
};
