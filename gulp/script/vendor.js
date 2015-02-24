'use strict';
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var options = require('../options.js');
var notify = require('gulp-notify');
var browserify = require('browserify');
var streamify = require('gulp-streamify');
var source = require('vinyl-source-stream');
var ngmin = require('gulp-ng-annotate');
var gutil = require('gulp-util');

function generateVendorJs() {
    'use strict';
    
    return gulp.src('src/public/vendor/**/*.js')
        .pipe(gulp.dest(options.appOutput + '/scripts/vendor/'));
}

gulp.task('script-vendor', generateVendorJs);