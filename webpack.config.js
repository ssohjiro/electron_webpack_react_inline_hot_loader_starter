/* eslint func-names: 0 */
var webpack = require('webpack');
var path = require('path');
var loadersByExtension = require('loaders-by-extension');
var webpackTargetElectronRenderer = require('webpack-target-electron-renderer');

var projectRoot = __dirname;
var appRoot = path.join(projectRoot, 'src/');

var serverConfig = (function(opts) {
  var entry = {
    main: opts.prerender ? path.join(appRoot, 'main') : path.join(appRoot, 'main')
  };

  var loaders = {
    'jsx': opts.hotComponents ? [ 'react-hot-loader', 'babel-loader' ] : 'babel-loader',
    'js': { loader: 'babel-loader', include: appRoot },
    //'json': 'json-loader',
    'txt': 'raw-loader',
    'png|jpg|jpeg|gif|svg': 'url-loader?limit=10000',
    'woff|woff2': 'url-loader?limit=100000',
    'ttf|eot': 'file-loader',
    'wav|mp3': 'file-loader',
    'html': 'html-loader',
    'md|markdown': [ 'html-loader', 'markdown-loader' ],
    'css': 'file-loader'
  };

  var additionalLoaders = [ /*{ test: /some-reg-exp$/, loader: 'any-loader' }*/ ];
  var alias = { };
  //var aliasLoader = { };
  var externals = [ ];
  var modulesDirectories = [ 'node_modules' ];
  var extensions = [ '', '.js', '.jsx', '.json', '.node' ];
  var publicPath = opts.devServer ? 'http://localhost:2992/dist/' : '/dist/';

  var output = {
    path: projectRoot + '/dist/',
    filename: 'bundle.js',
    publicPath: publicPath,
    contentBase: projectRoot + '/public/',
    libraryTarget: 'commonjs2'
  };

  var excludeFromStats = [ /node_modules[\\\/]react(-router)?[\\\/]/ ];

  var plugins = [
    new webpack.PrefetchPlugin('react'),
    new webpack.PrefetchPlugin('react/lib/ReactComponentBrowserEnvironment')
  ];

  var options = {
    entry: entry,
    output: output,
    externals: externals,
    module: {
      loaders: [].concat( loadersByExtension(loaders) ).concat(additionalLoaders)
    },
    devtool: opts.devtool,
    debug: opts.debug,
    resolve: {
      root: appRoot,
      modulesDirectories: modulesDirectories,
      extensions: extensions,
      alias: alias,
      packageMains: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main']
    },
    plugins: plugins,
    devServer: {
      stats: {
        cached: false,
        exclude: excludeFromStats
      }
    }
  };

  options.target = webpackTargetElectronRenderer(options);

  return options;
}({}));

// ------------------- client;


var argv = require('yargs').argv;
var webpack = require('webpack');
var _ = require('underscore');
var path = require('path');
var fs = require('fs');
//var layoutStore = require('./src/rendererProcess/store/layoutStore');
require('es6-promise').polyfill();

var PRODUCTION = process.env.NODE_ENV === 'production';

/*
var sections = layoutStore.getAllData().get('sections');
var requireStrForAllSection = 'module.exports = {\n';
_.each( sections, function( info, i ) {
	requireStrForAllSection += (info.sectionId + ': require('+info.modulePath+')');
	if( i+1 < sections.length ) requireStrForAllSection += ",\n";
});
requireStrForAllSection += '};';
*/

function plugins() {
  var all = [
	 //new webpack.IgnorePlugin(/ipc/, ''),
	  new webpack.NormalModuleReplacementPlugin(/^component\//, function(result) {
		  result.request = result.request.replace(/^component\/(.*)/, '_afterRixComponent/\$1');
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
fs.writeFileSync('src/rendererProcess/_main.js',
	'require("./common.css");\n'+
	'require("./_afterRixComponent/bundle.css");\n'+
	'require("./main.js");'
);


var clientConfig = {

  context: __dirname,
  entry: {
	  javascript: './src/rendererProcess/_main.js'
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
	modulesDirectories: [ '.', 'src/rendererProcess', 'src', 'node_modules']
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

//module.exports = [ serverConfig, clientConfig ];
module.exports = clientConfig;
