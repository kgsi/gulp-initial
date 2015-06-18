var gulp        = require('gulp'),
	del         = require('del'),
	browser     = require('browser-sync'),
	plumber     = require('gulp-plumber'),
	notify      = require('gulp-notify'),
	compass     = require('gulp-compass'),
	rename      = require('gulp-rename'),
	uglify      = require('gulp-uglify'),
	concat      = require('gulp-concat'),
	cssmin      = require('gulp-cssmin'),
	pleeease    = require('gulp-pleeease'),
	imagemin    = require('gulp-imagemin'),
	pngquant    = require('imagemin-pngquant'),
	jpegtran    = require('imagemin-jpegtran'),
	ejs         = require("gulp-ejs"),
	watch       = require('gulp-watch'),
	critical    = require('critical'),
	styleguide  = require('gulp-styledocco'),
	gutil       = require('gulp-util'),
	ftp         = require('gulp-ftp'),
	runSequence = require('run-sequence');

var path = {
	src: 'src',
	dev: 'app',
	dest: 'dest'
	},
	switchPath = path.dev; //devとdestをswitchするための変数



/*!
 * Partical task
 */

// browserSync
gulp.task('browser', function() {
	browser({
		// phpを使わない場合は下記を有効にする
		server: {
			baseDir: path.src
		},
		reloadDelay: 1000
		// phpを使う場合は、下記を有効にして、appディレクトリを
		// MAMPを使うなどしてサーバ化する
		// proxy: 'localhost:8888'
	});
});

// reload
gulp.task('reload', function () {
	browser.reload();
});

// clean
gulp.task('clean', function(callback) {
  del(['dest', 'tmp'], callback);
});

// sass(compass)
gulp.task('compass', function () {
	return gulp.src(path.src + '/sass/**/*.scss')
		.pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
		.pipe(compass({ 
				config_file : 'config.rb',
				comments : false,
				css :  switchPath + '/assets/css/',
				sass:  path.src + '/sass/',
				image: path.src + '/images/'
		}))
		.pipe(pleeease({
			fallbacks: {
				autoprefixer: ['last 4 versions'] 
			},
			minifier: false
		}))
		.pipe(gulp.dest(switchPath + '/assets/css/'))
		.pipe(browser.reload({stream:true}));

});

// js copy
gulp.task('js', function() {
	gulp.src(path.src + '/js/*.js')
		.pipe(gulp.dest(switchPath + '/assets/js/'))
		.pipe(browser.reload({stream: true}));
});

// library min (concat & uglify)
gulp.task('libsmin', function() {
	return gulp.src([
			path.src + '/js/libs/jquery.js',
			path.src + '/js/libs/velocity.js',
			path.src + '/js/libs/velocity.ui.js'
		])
		.pipe(concat('libs.js'))
		.pipe(uglify())
		.pipe(gulp.dest(switchPath + '/assets/js/'))
});

// ejs
gulp.task('ejs', function() {
	return gulp.src([
			path.src + "/ejs/**/*.ejs",
			'!' + path.src + "/ejs/**/_*.ejs",
			'!' + path.src + "/ejs/_template/*.ejs"
		])
		.pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
		.pipe(ejs())
		.pipe(gulp.dest(switchPath));
});

// image min
gulp.task('imagemin', function () {
	return gulp.src(path.src + '/images/**/*')
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
		.pipe(gulp.dest(switchPath + '/assets/images/'));
});

// css min
gulp.task('cssmin', function () {
	return gulp.src(path.dev + '/assets/css/**/*')
		.pipe(cssmin())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(switchPath + '/assets/css/'));
});

// js min
gulp.task('jsmin', function() {
	gulp.src(path.src + '/js/*.js')
		.pipe(uglify())
		.pipe(gulp.dest(switchPath + '/assets/js/'));
});

// watch
gulp.task('watch', function(){
	// watch(["./app/**/*.html"], function(event){
	// 	gulp.start(['reload']);
	// });

	watch([path.src + '/sass/**/*.scss'], function(event){
		gulp.start(['compass']);
	});

	watch([path.src + '/ejs/**/*.ejs'], function(event){
		gulp.start(['ejs','reload']);
	});

	watch([path.src + '/js/*.js'], function(event){
		gulp.start(['js']);
	});

	watch([path.src + '/js/libs/*.js'], function(event){
		gulp.start(['libsmin']);
	});

});

// styleGuide
gulp.task('styleguide', function () {
	gulp.src(path.dev + '/assets/css/*.css')
		.pipe(styleguide({
			out: switchPath + '/styleguide',
			name: 'styleguide'
	}));
});

// criticalPath css(inline)
gulp.task('critical', function () {
  critical.generateInline({
		base: path.src,
		src: 'index.html',
		//dest: 'assets/css/critical.css',
		htmlTarget: 'index.html',
		minify: true,
		width: 1000,
		height: 768
	});
});

// ftp upload
gulp.task('upload',function(callback){
	return gulp.src('dest/**/*')
		.pipe(ftp({
			host: 'XXX',
			user: 'XXX',
			pass: '000',
			remotePath: '/XXX/XXX/',
		}))
		.pipe(gutil.noop()).on('end', function() {
			callback();
		});
});



/*!
 * set task
 */

// default
gulp.task('default',['browser','watch'], function(event){
	gulp.start(['compass','js','libsmin','ejs']);
});

// dest
gulp.task('dest',function(callback){
	switchPath = path.dest;
	runSequence('clean', ['compass','js','generate','ejs'], ['jsmin','libsmin','imagemin'], 'upload');
});

// minify
gulp.task('min',['cssmin','imagemin','jsmin']);

// test
gulp.task("test",function(done){
	console.log(path.src)
});
