'use strict';

var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
require('es6-promise').polyfill();

var PRODUCTION = process.env.NODE_ENV === 'production';

function plugins() {
  var all = [
	//new webpack.IgnorePlugin(/ipc/, ''),
    new webpack.NormalModuleReplacementPlugin(/^react$/, 'react/addons')
	//new webpack.IgnorePlugin(new RegExp("^(fs|ipc)$"))
  ];

  var production = [
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('production') } })
  ];

  return PRODUCTION ? all.concat(production) : all;
}

// fake entry file for dev-server
fs.writeFileSync('_afterRix/_main.js', 'require("./bundle.css"); require("./main.js");');

module.exports = {

  context: __dirname,
  entry: {
	  javascript: './_afterRix/_main.js'
	  //javascript: './src/main.js'
	  //html: './index.html'
	  //css: './_afterRix/bundle.css'
  },

  output: {
    filename: 'bundle.js',
    path: path.join( __dirname, '_build' ),
    publicPath: '_build'
  },

  module: {
	loaders: [
		{ test: require.resolve('react/addons'), loader: 'expose?React' },
		{
			test: /\.js$/,
			loaders: ["react-hot", "babel-loader"],
			exclude: /node_modules/
		},
		{
			test: /\.html$/,
			loader: "file?name=[name].[ext]"
		},

		{
			test: /\.css$/, // Only .css files
			loader: 'style!css' // Run both loaders
		}
	]
  },

  devtool: 'inline-source-map',
  plugins: plugins()
};
