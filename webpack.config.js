const webpack = require("webpack");
const yargs   = require("yargs");
const path    = require("path");
const nib     = require('nib');

const argv = yargs
	.boolean("p").alias("p", "optimize-minimize")
	.argv;


module.exports = {
	entry: {
		index: (function() {
			const entrypoint = [];

			!argv.p && entrypoint.push("webpack-hot-middleware/client");

			entrypoint.push(path.join(__dirname, "src",  "example", "index.js"));

			return entrypoint;
		})()
	},

	output: {
		path:       path.join(__dirname, "dist"),
		filename:   "[name].js",
		publicPath: "/"
	},

	module: {
		loaders: [
			{
				test:    /\.(js|jsx)$/,
				include: __dirname,
				exclude: /node_modules/,
				loader: "babel"
            },
			{
				test:    /\.styl$/,
				loaders: [
					"style",
					"css",
					"autoprefixer?browsers=last 2 version",
					"stylus"
				]
			},
			{
				test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
				loader: "url?limit=10000&mimetype=image/svg+xml"
			}
		]
	},

	resolve: {
		extensions: ["", ".js", ".styl"],
		root: [
			path.join(__dirname, "src")
		]
	},
    resolveLoader: {
        root: path.join(__dirname, 'node_modules')
    },

	cache:   !argv.p,
	debug:   !argv.p,
	//devtool: !argv.p ? "#cheap-module-eval-source-map" : false,
	devtool: !argv.p ? "#source-map" : false,
	stats:   {
		colors: true
	},
	stylus: {
		use: [nib()]
	},

	plugins: (function() {
		const plugins = [];

		plugins.push(new webpack.optimize.OccurenceOrderPlugin());

		if (argv.p) {
			plugins.push(new webpack.optimize.DedupePlugin());
			plugins.push(new webpack.optimize.UglifyJsPlugin({
				compress: {
					warnings: false
				}
			}));
			plugins.push(new webpack.optimize.AggressiveMergingPlugin());
		} else {
			plugins.push(new webpack.HotModuleReplacementPlugin());
			plugins.push(new webpack.NoErrorsPlugin());
		}

		return plugins;
	})()
};
