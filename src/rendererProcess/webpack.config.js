'use strict';

var argv = require('yargs').argv;
var webpack = require('webpack');
var _ = require('underscore');
var path = require('path');
var fs = require('fs');

require('requirish')._(module);
var layoutStore = require('src/store/layoutStore');
require('es6-promise').polyfill();

var PRODUCTION = process.env.NODE_ENV === 'production';

var sections = layoutStore.getAllData().get('sections');
var requireStrForAllSection = 'module.exports = {\n';
_.each( sections, function( info, i ) {
	requireStrForAllSection += (info.sectionId + ': require('+info.modulePath+')');
	if( i+1 < sections.length ) requireStrForAllSection += ",\n";
});
requireStrForAllSection += '};';

function plugins() {
  var all = [
	 //new webpack.IgnorePlugin(/ipc/, ''),
	  new webpack.NormalModuleReplacementPlugin(/^component\//, function(result) {
		  result.request = result.request.replace(/^component\/(.*)/, '../_afterRixComponent\/\$1');
	  }),
    new webpack.NormalModuleReplacementPlugin(/^react$/, 'react/addons'),
    //new webpack.NormalModuleReplacementPlugin(/^component\/(.*)/, '../_afterRixComponent\/\$1'),
	//new webpack.IgnorePlugin(new RegExp("^(fs|ipc)$"))
	new webpack.DefinePlugin({
		__DEVELOPEMENT__: JSON.stringify( argv.prdbuild ? false : true ),
		__PRODUCTION__: JSON.stringify( argv.prdbuild ? true : false ),
		__IS_WEBPACK__: JSON.stringify( true )

		//__ALL_SECTION_MODULE__: JSON.stringify( 
	})
  ];

  var production = [
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('production') } })
  ];

  return PRODUCTION ? all.concat(production) : all;
}

// fake entry file for dev-server
fs.writeFileSync('src/_main.js',
	'require("./common.css");\n'+
	'require("../_afterRixComponent/bundle.css");\n'+
	'global.isomorphicModules = {};\n'+
	'global.isomorphicModules.appConstants = require("../../appConstants");\n'+
	'require("./main.js");'
);


module.exports = {

  context: __dirname,
  entry: {
	  javascript: './src/_main.js'
	  //javascript: './src/main.js'
	  //html: './index.html'
	  //css: './_afterRix/bundle.css'
  },

  output: {
    filename: 'bundle.js',
    path: path.join( __dirname, '_build' ),
    publicPath: '_build'
  },

  resolve: {
	modulesDirectories: [ 'src', 'node_modules']
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
