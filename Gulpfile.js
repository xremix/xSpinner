/* globals require */
'use strict';

var gulp = require('gulp'),
	autoprefixer = require('gulp-autoprefixer'),
	gulpIf = require('gulp-if'),
	minifyCSS = require('gulp-minify-css'),
	sass = require('gulp-sass'),
	plumber = require('gulp-plumber'),
	rename = require('gulp-rename');

// ----- SETTINGS -----
var settings = {
  production:true,
  paths:{
	distribution: 'dist',
	web:{
		src:[
			'app/**/*.htm*',
			//'app/**/*.php'
		],
		dist:'dist'
	},
	style:{
		src: ['app/**.scss'],
		distFile: 'main.css',
		dist: 'dist/'
	}
  }
};

// ----- DEFAULT TASK -----
gulp.task('default', ['build', 'watch']);
gulp.task('build', ['style']);

// ----- WATCH TASK -----
gulp.task('watch', function(){
	gulp.watch(settings.paths.style.src, ['style']);
});


// ----- STYLE TASK -----
gulp.task('style', function() {
	gulp.src(settings.paths.style.src)
	.pipe(plumber())
	.pipe(sass().on('error', sass.logError))
	//.pipe(concat(settings.paths.style.distFile))
	.pipe(autoprefixer({
		browsers: ['last 3 versions'],
		cascade: false
		}))
	.pipe(gulp.dest(settings.paths.style.dist))
	.pipe(gulpIf(settings.production, minifyCSS()))
	.pipe(rename({
		suffix: ".min"
	}))
	.pipe(gulp.dest(settings.paths.style.dist));
});
