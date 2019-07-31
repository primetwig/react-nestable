const path = require("path");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const express = require("express");

const ip = 'localhost';
const port = 8888;
const config = require("../webpack.config");

const app = new express(); // eslint-disable-line new-cap

const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  path: config.output.publicPath,
  stats: {
    colors: true
  }
}));
app.use(webpackHotMiddleware(compiler));

app.use('/', express.static(path.join(__dirname, '../dist')));

app.use(function (req, res) {
  res.sendFile(path.resolve(__dirname, "../dist/example/index.html"));
});

app.listen(port, function (error) {
  if (error) {
    console.error(error);
  } else {
    console.log("started, visit http://" + ip + ":" + port);
  }
});


