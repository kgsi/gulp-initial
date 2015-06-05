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
var ejs        = require('gulp-ejs');
var watch      = require('gulp-watch');
var critical   = require('critical');
var styleguide = require('gulp-styledocco');

var srcDirectory = './src';
var distDirectory = './app';

// browserSync
gulp.task('browser', function() {
	browser({
		// phpを使わない場合は下記を有効にする
		server: {
			baseDir: distDirectory
		},
		reloadDelay: 500
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
				css : distDirectory+'/assets/css/',
				sass: './src/sass/',
				image: distDirectory+'/assets/images/'
		}))
		.pipe(pleeease({
			fallbacks: {
				autoprefixer: ['last 4 versions'] //ベンダープレフィックス
			},
			minifier: false //圧縮の有無
		}))
		.pipe(gulp.dest(distDirectory+'/assets/css/'))
		.pipe(browser.reload({stream:true}));

});

// js
gulp.task('js', function() {
	gulp.src(srcDirectory + '/js/*.js')
		.pipe(gulp.dest(distDirectory + '/assets/js/'))
		.pipe(browser.reload({stream: true}));
});

// ejs
gulp.task('ejs', function() {
	return gulp.src(
			[srcDirectory + '/ejs/**/*.ejs','!' + srcDirectory + '/ejs/**/_*.ejs']
		)
		.pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
		.pipe(ejs())
		.pipe(gulp.dest('./app/'))
});

// jsLibrary min (concat & uglify)
gulp.task('libsmin', function() {
	gulp.src([
			'./src/js/libs/jquery.js',
			'./src/js/libs/velocity.js',
			'./src/js/libs/velocity.ui.js'
		])
		.pipe(concat('libs.js'))
		.pipe(uglify())
		.pipe(gulp.dest(distDirectory + '/assets/js/'))
});

// criticalPath css(inline)
gulp.task('critical', function () {
  critical.generateInline({
		base: distDirectory,
		src: 'index.html',
		//dest: 'assets/css/critical.css',
		htmlTarget: 'index.html',
		minify: true,
		width: 1000,
		height: 768
	});
});

// image min
gulp.task('imagemin', function () {
	gulp.src(distDirectory + '/assets/images/**/*')
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
	.pipe(gulp.dest(distDirectory + '/assets/images/'));
});

// css min
gulp.task('cssmin', function () {
	gulp.src(distDirectory + '/assets/css/**/*')
		.pipe(cssmin())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(distDirectory + '/assets/css/'));
});

// js min
gulp.task('jsmin', function() {
	gulp.src('./src/js/*.js')
		.pipe(uglify())
		.pipe(gulp.dest(distDirectory + '/assets/js/'));
});

// styleGuide
gulp.task('styleguide', function () {
	gulp.src(distDirectory + '/assets/css/*.css')
		.pipe(styleguide({
			out: distDirectory + '/styleguide',
			name: 'styleguide'
	}));
});

// watch
gulp.task('watch', function(){
	watch([srcDirectory + '/sass/**/*.scss'], function(event){
		gulp.start(['compass']);
	});

	watch([srcDirectory + '/ejs/**/*.ejs'], function(event){
		gulp.start(['ejs','reload']);
	});

	watch([srcDirectory + '/js/*.js'], function(event){
		gulp.start(['js']);
	});

	watch([srcDirectory + '/js/libs/*.js'], function(event){
		gulp.start(['libsmin']);
	});

});

// default
gulp.task('default',['browser','watch'], function(event){
	gulp.start(['compass','ejs','js','libsmin']);
});

// minify
gulp.task('min',['cssmin','imagemin','jsmin']);
