const webpack = require("webpack");
const yargs = require("yargs");
const path = require("path");

const argv = yargs
  .boolean("p")
  .alias("p", "optimize-minimize")
  .argv;

module.exports = {
  entry: {
    example: [
      path.join(__dirname, "src", "example", "example.js"),
    ],
  },

  output: {
    path: path.join(__dirname, "dist", "example"),
    filename: "[name].js",
    publicPath: "/",
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: __dirname,
        exclude: /node_modules/,
        use: ["babel-loader", "eslint-loader"],
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  ["postcss-preset-env"],
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10000,
              mimetype: "image/svg+xml",
            },
          },
        ],
      },
    ],
  },

  resolve: {
    extensions: [".js", ".css"],
    modules: [
      path.join(__dirname, "src"),
      "node_modules",
    ],
  },

  mode: argv.p ? "production" : "development",
  devtool: argv.p ? "source-map" : "eval-cheap-source-map",
  devServer: {
    contentBase: './dist/example',
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
  })()
};
