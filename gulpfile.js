var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var argv = require('yargs').argv;
var fs = require('fs');
var glob = require("glob");

function getDeployTask(task, cacheControl, src) {
    return require('./gulp-tasks/deploy/' + task)(gulp, plugins, argv, cacheControl, src);
}

// Dev
gulp.task('refresh', function () {
    browserSync.init({
        server: {
            baseDir: './',
            index: 'debug.html',
            middleware: function (req, res, next) {
                res.setHeader('Access-Control-Allow-Origin', '*');
                next();
            }
        },
        ghostMode: false,
        open: false
    });

    gulp.watch(['build/**/*.*', 'debug.html']).on('change', browserSync.reload);
});

// Dist

gulp.task('dist-loader', function() {
    return gulp.src('js/loader.js')
        .pipe(plugins.uglify())
        .pipe(plugins.rename('loader.min.js'))
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('dist-vendor', function () {
    return gulp.src(['js/vendor/*.js', 'js/vendor/vendor.json']).pipe(gulp.dest('./dist/js/vendor'));
});

gulp.task('dist-html', function () {
    return gulp.src('default.html').pipe(gulp.dest('./dist/'));
});

gulp.task('dist-img', function() {
    return gulp.src('img/*.*').pipe(gulp.dest('./dist/img'));
});

gulp.task('dist', ['dist-loader', 'dist-vendor', 'dist-html', 'dist-img']);

// Deploy
gulp.task('deploy-loader', getDeployTask('cdn', 'no-cache', ['dist/js/loader.min.js']));
gulp.task('deploy-players', getDeployTask('player'));
