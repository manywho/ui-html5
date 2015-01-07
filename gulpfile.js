var gulp = require('gulp'),
    browserSync = require('browser-sync');
    less = require('gulp-less'),
    watch = require('gulp-watch');

gulp.task('less', function () {

    gulp.src('css/*.less')
       .pipe(watch('css/*.less'))
       .pipe(less())
       .pipe(gulp.dest('css'));

});

gulp.task('browser-sync', function () {

    var files = [
        '*.html',
        'css/**/*.css',
        'img/**/*.png',
        'js/**/*.js'
    ];

    browserSync.init(files, {
        server: {
            baseDir: '.'
        }
    });

});

gulp.task('refresh', ['less', 'browser-sync']);