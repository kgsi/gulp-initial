var gulp       = require('gulp');
var browser    = require('browser-sync');
var plumber    = require('gulp-plumber');
var notify     = require('gulp-notify');
var compass    = require('gulp-compass');
var rename     = require('gulp-rename');
var uglify     = require('gulp-uglify');
var concat     = require('gulp-concat');
var cssmin     = require('gulp-cssmin');
var pleeease   = require('gulp-pleeease');
var imagemin   = require('gulp-imagemin');
var pngquant   = require('imagemin-pngquant');
var jpegtran   = require('imagemin-jpegtran');
var ejs        = require("gulp-ejs");
var watch      = require('gulp-watch');
var critical   = require('critical');
var styleguide = require('gulp-styledocco');

var srcDirectory    = './src';
var devDirectory    = './app';
var destDirectory   = './dest';
var switchDirectory = devDirectory;


/*!
 * Partical task
 */

// browserSync
gulp.task('browser', function() {
	browser({
		// phpを使わない場合は下記を有効にする
		server: {
			baseDir: devDirectory
		},
		reloadDelay: 1000
		// phpを使う場合は、下記を有効にして、appディレクトリを
		// MAMPを使うなどしてサーバ化する
		// proxy: 'localhost:8888'
	});
});

//reload
gulp.task('reload', function () {
	browser.reload();
});

// sass(compass)
gulp.task('compass', function () {
	return gulp.src(srcDirectory + '/sass/**/*.scss')
		.pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
		.pipe(compass({ 
				config_file : './config.rb',
				comments : false,
				css : devDirectory  +'/assets/css/',
				sass: srcDirectory  +'/sass/',
				image: devDirectory +'/assets/images/'
		}))
		.pipe(pleeease({
			fallbacks: {
				autoprefixer: ['last 4 versions'] 
			},
			minifier: false
		}))
		.pipe(gulp.dest(switchDirectory+'/assets/css/'))
		.pipe(browser.reload({stream:true}));

});

// js copy
gulp.task('js', function() {
	gulp.src(srcDirectory + '/js/*.js')
		.pipe(gulp.dest(switchDirectory + '/assets/js/'))
		.pipe(browser.reload({stream: true}));
});

// ejs
gulp.task('ejs', function() {
	return gulp.src(
			["./src/ejs/**/*.ejs",'!' + "./src/ejs/**/_*.ejs",'!' + "./src/ejs/_template/*.ejs"]
		)
		.pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
		.pipe(ejs())
		.pipe(gulp.dest(replaceDirectory))
});

// library min (concat & uglify)
gulp.task('libsmin', function() {
	gulp.src([
			'./src/js/libs/jquery.js',
			'./src/js/libs/velocity.js',
			'./src/js/libs/velocity.ui.js',
			'./src/js/libs/jquery.cookie.js',
			'./src/js/libs/slick.js'
		])
		.pipe(concat('libs.js'))
		.pipe(uglify())
		.pipe(gulp.dest(switchDirectory + '/assets/js/'))
});

// image min
gulp.task('imagemin', function () {
	gulp.src(srcDirectory + '/images/**/*')
	.pipe(imagemin({
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		use: [
			pngquant({
				quality: '60-80',
				speed: 1
			}),
			jpegtran({progressive: true})
		]
	}))
	.pipe(gulp.dest(switchDirectory + '/assets/images/'));
});

// js min
gulp.task('jsmin', function() {
	gulp.src(srcDirectory + '/js/*.js')
		.pipe(uglify())
		.pipe(gulp.dest(switchDirectory + '/assets/js/'));
});

// css min (develop only)
gulp.task('cssmin', function () {
	gulp.src(devDirectory + '/assets/css/**/*')
		.pipe(cssmin())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(devDirectory + '/assets/css/'));
});

// watch
gulp.task('watch', function(){
	// watch(["./app/**/*.html"], function(event){
	// 	gulp.start(['reload']);
	// });

	watch(['./src/sass/**/*.scss'], function(event){
		gulp.start(['compass']);
	});

	watch(['./src/ejs/**/*.ejs'], function(event){
		gulp.start(['ejs','reload']);
	});

	watch(['./src/js/*.js'], function(event){
		gulp.start(['js']);
	});

	watch(['./src/js/libs/*.js'], function(event){
		gulp.start(['libsmin']);
	});

});

// styleGuide
gulp.task('styleguide', function () {
	gulp.src(devDirectory + '/assets/css/*.css')
		.pipe(styleguide({
			out:  'styleguide',
			name: 'styleguide'
	}));
});

// criticalPath css(inline)
gulp.task('critical', function () {
  critical.generateInline({
		base: './app/',
		src: 'index.html',
		//dest: 'assets/css/critical.css',
		htmlTarget: 'index.html',
		minify: true,
		width: 1000,
		height: 768
	});
});



/*!
 * Set task
 */

// default
gulp.task('default',['browser','watch'], function(event){
	gulp.start(['compass','js','libsmin','ejs']);
});

// minify
gulp.task('min',['cssmin','imagemin','jsmin']);

// dest
gulp.task("dest",function(){
	//ディレクトリの指定
	switchDirectory = destDirectory;	

	//生成タスクを全て実行
	gulp.start(['compass','js','jsmin','libsmin','imagemin','ejs']);

	//生成タスクと関係ないファイルをdistフォルダへコピー	
	return gulp.src(
		[ './src/assets/json/*.json', './src/assets/fonts/**'],
		{ base: 'app' } //開発ディレクトリの構造を維持したままコピー
	)
	.pipe( gulp.dest('dest'));
});

// test(debug用)
gulp.task("test",function(){
	console.log('test');
});

