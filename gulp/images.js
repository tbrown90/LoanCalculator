'use strict';
var gulp = require('gulp'); 
var options = require('./options.js');


function moveImages() {
    return gulp.src('src/public/images/**/*')
        .pipe(gulp.dest(options.appOutput + '/images/'));
}

gulp.task('images', moveImages);