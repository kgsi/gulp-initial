var gulp = require('gulp');
var browser = require('browser-sync');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var compass = require('gulp-compass');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var pleeease = require('gulp-pleeease');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var ejs = require("gulp-ejs");
var critical = require('critical');
var styleguide = require('gulp-styledocco');

// browserSync
gulp.task("browser", function() {
	browser({
		// phpを使わない場合は下記を有効にする
		server: {
			baseDir: "./app/"
		}
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
	return gulp.src('./src/sass/**/*.scss')
		.pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
		.pipe(compass({ 
				config_file : './config.rb',
				comments : false,
				css : './app/assets/css/',
				sass: './src/sass/',
				image: './app/assets/images/'
		}))
		.pipe(pleeease({
			fallbacks: {
				autoprefixer: ['last 4 versions'] //ベンダープレフィックス
		    },
		    optimizers: {
				minifier: false //圧縮の有無
		    }
		}))
		//.pipe(gulp.dest('./app/assets/temp'))
		.pipe(browser.reload({stream:true}))
});

// js library (concat & uglify)
gulp.task('libsmin', function() {
	gulp.src('./src/js/libs/*.js')
		.pipe(concat('libs.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./app/assets/js/'))
		.pipe(browser.reload({stream: true}));
});

// js
gulp.task('js', function() {
	gulp.src('./src/js/*.js')
		.pipe(gulp.dest('./app/assets/js/'))
		.pipe(browser.reload({stream: true}));
});

// ejs
gulp.task("ejs", function() {
	gulp.src(
		["./src/ejs/**/*.ejs",'!' + "./src/ejs/**/_*.ejs"]
	)
	.pipe(ejs())
	.pipe(gulp.dest("./app"));
});

// critical-path css(inline)
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

// image min
gulp.task('imagemin', function () {
	gulp.src('./app/assets/images/**/*')
	.pipe(imagemin({
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		use: [pngquant({
			quality: '60-80',
			speed: 1
		})]
	}))
	.pipe(gulp.dest('./app/assets/images/'));
});

// css min
gulp.task('cssmin', function () {
	gulp.src('./app/assets/css/**/*')
		.pipe(cssmin())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('./app/assets/css/'));
});

// js min
gulp.task('jsmin', function() {
	gulp.src('./src/js/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('./app/assets/js/'))
		.pipe(browser.reload({stream: true}));
});

// styleGuide
gulp.task('styleguide', function () {
	gulp.src('./app/assets/css/*.css')
		.pipe(styleguide({
			out: './app/styleguide',
			name: 'styleguide'
	}));
});

// watch
gulp.task('watch', function() {
	gulp.watch('./app/**/*.html',['reload']);
	gulp.watch('./src/sass/**/*.scss', ['compass','reload'])
	gulp.watch("./src/ejs/**/*.ejs",['ejs','reload']);
	gulp.watch("./src/js/*.js",['js']);

	var libsmin = gulp.watch('./src/js/libs/*.js', ['libsmin']);
	libsmin.on('change', function(event) {
    	console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
	});
});

// default
gulp.task("default",['browser','watch']);

// minify
gulp.task("min",['cssmin','imagemin','jsmin']);