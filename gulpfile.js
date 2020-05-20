const gulp=require('gulp');



/*
var concatCss = require('gulp-concat-css');
let cleanCSS = require('gulp-clean-css');

gulp.task('allcss', function () {
    return gulp.src('public/frontend/css/!*.css')

        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('public/'));
});

*/


var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var pipeline = require('readable-stream').pipeline;
gulp.task('scripts', function() {
    return gulp.src('public/frontend/js/*.js')
        .pipe(uglify())
.pipe(gulp.dest('public/frontend/js/'));
});


/*const gulp = require('gulp');
const imagemin = require('gulp-imagemin');

gulp.task('default', () =>
    gulp.src('public/upload/2019/05/31/*')
        .pipe(imagemin())
        .pipe(gulp.dest('public/compress'))
);*/