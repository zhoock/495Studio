"use strict";

var gulp            = require('gulp'),
	compass         = require('gulp-compass'),
	minifyCSS       = require('gulp-minify-css'),
	rename          = require("gulp-rename"),
	jade            = require('gulp-jade'),
	watch           = require('gulp-watch'),
	notify          = require("gulp-notify"),
	livereload      = require('gulp-livereload'),
	connect         = require('gulp-connect'),
	rev             = require('gulp-rev'),
	revCollector    = require('gulp-rev-collector'),
	gutil           = require('gulp-util'),
	rimraf          = require('rimraf'),
	revOutdated     = require('gulp-rev-outdated'),
	path            = require('path'),
	through         = require('through2'),
	uglify          = require('gulp-uglify'),
	pump            = require('pump'),
	jsImport        = require('gulp-js-import');


// server connect
gulp.task('connect', function () { 
	connect.server({
		port: 1610,
		root: 'www',
		livereload: true
	});
});


// jade
gulp.task('jade', function () {
	gulp.src('./app/jade/*.jade')
		.pipe(jade({
			pretty: true,
			data: {
				debug: false
			}
		}))
		.pipe(gulp.dest('./www/'))
		.pipe(connect.reload());
});

// compass
gulp.task('rev', function () {
	return gulp.src('./app/**/*.+(scss|sass)')
		.pipe(compass({
			config_file: './config.rb',
			css: 'www/css',
			sass: 'app/sass',
			sourcemap: true
		}))
		.on('error', function (err) {
			console.log(err);
			this.emit('end');
		})
		.pipe(minifyCSS())
		.pipe(gulp.dest('./www/css/'))


		.pipe(rev())
		.pipe(gulp.dest('./www/css/'))
		.pipe(rev.manifest())
		.pipe(gulp.dest('./app/manifests/'))

		.pipe(notify('Done!'))

});

gulp.task('rev_collector', ['rev'], function () {
	return gulp.src(['./app/manifests/**/*.json', './www/*.html'])
		.pipe(revCollector({
			replaceReved: true
		}))

		.pipe(gulp.dest('./www/'))
		.pipe(connect.reload())
});

function cleaner() {
	return through.obj(function (file, enc, cb) {
		rimraf(path.resolve((file.cwd || process.cwd()), file.path), function (err) {
			if (err) {
				this.emit('error', new gutil.PluginError('Cleanup old files', err));
			}
					  cb();
		}.bind(this));
	});
}

gulp.task('clean',['rev_collector'], function () {
	gulp.src(['./www/**/*.*'], {read: false})
		.pipe(revOutdated(1)) // leave 2 recent assets (default value)
		.pipe(cleaner())

	return;

}); 


//uglify js
gulp.task('uglify', function () {
	pump([
		gulp.src('./www/js/main.js'),
		uglify(),
		gulp.dest('./www/js')
		],
	);
});


// import js
gulp.task('javascript', function() {
  return gulp.src('./app/js/main.js')
		.pipe(jsImport({hideConsole: true}))
		.pipe(uglify())
		.pipe(gulp.dest('./www/js'))

});


// watch
gulp.task('watch', function () {
	gulp.watch(('./app/**/*.jade'), ['jade']);
	gulp.watch(('./app/**/*.+(scss|sass)'), ['compass']);
	gulp.watch(('./app/**/*.js'), ['javascript']);
});


// default
gulp.task('default', ['connect', 'jade', 'compass', 'javascript', 'watch']);

// compass
gulp.task('compass', ['rev', 'rev_collector', 'clean']);


