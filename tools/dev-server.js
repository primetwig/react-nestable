const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');

const host = 'localhost';
const port = 8888

const config = require('../webpack.config.js');
const options = {
  contentBase: './dist/example',
  host: host,
  hot: true,
};

webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new webpackDevServer(compiler, options);

server.listen(port, 'localhost', () => {
  console.log([
    '=====',
    `started, visit http://${host}:${port}`,
    '=====',
  ].join('\n'));
});
