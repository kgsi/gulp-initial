var path               = require('path'),
	webpack            = require('gulp-webpack');
//  BowerWebpackPlugin = require('bower-webpack-plugin');

var src	               = './src',
	dest               = './dest',
	relativeSrcPath    = path.relative('.', src);


module.exports = {
	src: src,
	dest: dest,

	ejs: {
		src: [src + '/**/*.ejs', '!' + src + '/**/_*.ejs'],
		watch: src + '/**/*.ejs',
		json: src + '/data.json',
		dest: dest
	},

	css: {
		src: src + '/assets/sass/**/*.scss',
		dest: dest + '/assets/css',
		sass: src + '/assets/sass',
		images: src + '/assets/images',
		uglify: true
	},

	js: {
		src: src + '/assets/js/**/*.js',
		dest: dest + '/assets/js',
		uglify: true
	},

	libs: {
		src: [
			src + '/js/libs/jquery.js',
			src + '/js/libs/velocity.js',
			src + '/js/libs/velocity.ui.js'
		],
		rename: 'libs.js',
		watch: src + '/assets/js/libs/*.js',
		dest: dest + '/assets/js'
	},

	// Babel(ES6→ES5へ変換)と、jqueryのrequireまでテスト済み
	// destが遅すぎるのでタスクへの組み込みは見送り中
	// webpack: {
	// 	entry: src + '/assets/js/main.js',
	// 	entry: {
	// 		top: src + '/assets/js/top.js',
	// 		global: src + '/assets/js/global.js'
	// 	},
	// 	output: {
	// 		filename: '[name].js',
	// 		publicPath: dest + '/assets/js/'
	// 	},
	// 	resolve: {
	// 		extensions: ['', '.js']
	// 	},
	// 	module: {
	// 		loaders: [
	// 			{
	// 				test: /\.js$/,
	// 				exclude: /node_modules/,
	// 				loader: 'babel-loader', // <- without es6 polyfills
	// 				query: {compact: false}
	// 				// loader: 'babel-loader?experimental&optional=runtime'
	// 			}
	// 		]
	// 	},
	// 	devtool: 'source-map'
	// 	// plugins: [
	// 	// 	new BowerWebpackPlugin()
	// 	// ]
	// },

	image: {
		src: src + '/assets/images/**/*',
		dest: dest + '/assets/images'
	},
	copy: {
		src: [
			src + '/**/*', 
			'!' + src + '/**/*.ejs',
			'!' + src + '/assets/partial',
			'!' + src + '/data.json'
		],
		watch: [
			src + '/**/*', 
		],
		base: src,
		dest: dest
	}
};
