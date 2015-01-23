var gulp = require('gulp'),
    browserSync = require('browser-sync');
    less = require('gulp-less'),
    watch = require('gulp-watch'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    plumber = require('gulp-plumber'),
    concat = require('gulp-concat'),
    minifyCSS = require('gulp-minify-css'),
    rev = require('gulp-rev'),
    clean = require('gulp-clean'),
    uglify = require('gulp-uglify'),
    htmlreplace = require('gulp-html-replace'),
    glob = require('glob'),
    path = require('path'),
    gzip = require('gulp-gzip');


// Dev Time
gulp.task('less', function () {

    gulp.src('css/*.less')
        .pipe(plumber())
        .pipe(watch('css/*.less'))
        .pipe(less())
        .pipe(gulp.dest('css'));

});

gulp.task('jshint', function () {

    gulp.src('js/*.js')
        .pipe(plumber())
        .pipe(watch('js/*.js'))
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(jshint.reporter('fail'));

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

gulp.task('refresh', ['jshint', 'less', 'browser-sync']);

// Production Build
gulp.task('clean-dist', function () {

    gulp.src('dist/**/*.*', { read: false })
        .pipe(clean({ force: true }));

});

gulp.task('less-dist', function () {

    gulp.src('css/*.less')
        .pipe(concat('compiled.less'))
        .pipe(less())
        .pipe(minifyCSS())
        .pipe(rev())
        .pipe(gzip({ append: false }))
        .pipe(gulp.dest('./dist/css'));

});

gulp.task('js-dist', function () {

    gulp.src('js/**/*.js')
        .pipe(concat('compiled.js'))
        .pipe(uglify())
        .pipe(rev())
        .pipe(gzip({ append: false }))
        .pipe(gulp.dest('./dist/js'));

});

gulp.task('html-dist', function () {

    var compiledCss = path.basename(glob.sync('dist/css/compiled*.css')[0]);
    var compiledJs = path.basename(glob.sync('dist/js/compiled*.js')[0]);
    
    gulp.src('index.html')
        .pipe(htmlreplace({
            css: path.join("css/", compiledCss),
            js: path.join("js/", compiledJs)
        }))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('dist', ['clean-dist', 'less-dist', 'js-dist', 'html-dist']);
