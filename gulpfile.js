var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');
var del = require('del');

function getTask(task) {
    return require('./gulp-tasks/' + task)(gulp, plugins, browserSync);
}

// Dev

gulp.task('dev-less', getTask('dev/less'));
gulp.task('dev-js', getTask('dev/js'));
gulp.task('dev-ts', getTask('dev/ts'));
gulp.task('dev-bootstrap', getTask('dev/bootstrap'));
gulp.task('dev-bootstrap-themes', getTask('dev/bootstrap-themes'));

gulp.task('dev-fonts', function () {
    return gulp.src('css/fonts/*.*').pipe(gulp.dest('./build/css/fonts'));
});

gulp.task('dev-lib', function () {
    return gulp.src('css/lib/*.*').pipe(gulp.dest('./build/css/lib'));
});

gulp.task('refresh', ['dev-less', 'dev-js', 'dev-ts', 'dev-bootstrap', 'dev-bootstrap-themes', 'dev-fonts', 'dev-lib'], function () {

    browserSync.init({
        server: {
            baseDir: './',
            index: 'debug.html',
            middleware: function (req, res, next) {
                res.setHeader('Access-Control-Allow-Origin', '*');
                next();
            }
        },
        ghostMode: false
    });

    gulp.watch('css/*.less', ['dev-less']);
    gulp.watch('js/**/*.js', ['dev-js']).on('change', browserSync.reload);
    gulp.watch('js/**/*.ts', ['dev-ts']).on('change', browserSync.reload);
    gulp.watch('debug.html').on('change', browserSync.reload);

});

// Dist

gulp.task('dist-less', getTask('dist/less'));
gulp.task('dist-bootstrap', getTask('dist/bootstrap'));
gulp.task('dist-bootstrap-themes', getTask('dist/bootstrap-themes'));
gulp.task('dist-js', getTask('dist/js'));
gulp.task('dist-loader', getTask('dist/loader'));
gulp.task('dist-rev', getTask('dist/rev'));

gulp.task('dist-clean', function (cb) {
    del(['dist'], cb);
});

gulp.task('dist-fonts', function () {
    return gulp.src('css/fonts/*.*').pipe(gulp.dest('./dist/css/fonts'));
});

gulp.task('dist-vendor', function () {
    return gulp.src(['js/vendor/*.js', 'js/vendor/vendor.json']).pipe(gulp.dest('./dist/js/vendor'));
});

gulp.task('dist-html', function () {
    return gulp.src('default.html').pipe(gulp.dest('./dist/'));
});

gulp.task('dist', function () {
    runSequence('dist-clean',
                ['dist-less', 'dist-js', 'dist-loader', 'dist-bootstrap', 'dist-bootstrap-themes', 'dist-fonts', 'dist-vendor'],
                'dist-html',
                'dist-rev');
});

// Deploy

gulp.task('deploy-cdn', getTask('deploy/cdn'));
gulp.task('deploy-short-cache', getTask('deploy/short-cache'));
gulp.task('invalidate', getTask('deploy/invalidate'));
gulp.task('deploy-player', getTask('deploy/player'));
