'use strict';
var gulp = require('gulp');
var options = require('../options.js');
var gutil = require('gulp-util');
var browserify = require('browserify');
var manifest = require('./concat-filenames.js');
var source = require('vinyl-source-stream');
var streamify = require('gulp-streamify');
var ngmin = require('gulp-ng-annotate');
var tap = require('gulp-tap');

function generateFeatureJs() {
    'use strict';
    
    var manifestOptions = {
        root: 'src/public/features',
        prepend: 'require("./',
        append: '");'
    };
    
    var browserifyConfig = {
        debug: !gutil.env.production
    };
    
    return gulp.src('src/public/features/**/*.js')
        .pipe(manifest('features.js', manifestOptions))
        .pipe(tap(function doBrowserification(file, t) {
            return browserify(file)
                .bundle(browserifyConfig)
                .pipe(source('features.js'))
                .pipe(streamify(ngmin))
                .pipe(gulp.dest(options.appOutput + '/scripts/'));
        }));
}

gulp.task('script-features', generateFeatureJs);