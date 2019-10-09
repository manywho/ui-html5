var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var argv = require('yargs').default('platform_uri', '').default('output_directory', './dist').argv;

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

// local server
gulp.task('local-server', function () {
    // webpack server with local html and cors
    browserSync.init({
        server: {
            baseDir: './',
            index: 'local.html',
            middleware: function (req, res, next) {
                res.setHeader('Access-Control-Allow-Origin', '*');
                next();
            },
        },
        ghostMode: false,
        open: false,
    });
    // when files or local.html change, reload
    gulp.watch(['build/**/*.*', 'local.html']).on('change', browserSync.reload);
    // also watch debug.html and rebuild local.html when it does
    gulp.watch('debug.html', ['build-local']);
});
// build the local.html ::TODO:: take url from somewhere, maybe also port
// (so we can do the same with prod or any server we want)
gulp.task('build-local', function () {
    return gulp.src('debug.html')
        .pipe(plugins.replace('https://development.manywho.net', 'http://localhost:22936'))
        .pipe(plugins.rename('local.html'))
        .pipe(gulp.dest('.'));
});
// local backend
gulp.task('local', ['build-local', 'local-server']);


// Dist

gulp.task('dist-loader', function() {
    return gulp.src('js/loader.js')
        .pipe(plugins.uglify())
        .pipe(plugins.rename('loader.min.js'))
        .pipe(gulp.dest(`${argv.output_directory}/js`));
});

gulp.task('dist-html', function () {
    return gulp.src('default.html')
        .pipe(plugins.replace('{{cdnurl}}', argv.cdnurl))
        .pipe(plugins.replace('{{platform_uri}}', argv.platform_uri))
        .pipe(plugins.rename(argv.tenant + '.' + argv.player))
        .pipe(gulp.dest(`${argv.output_directory}/players/`));
});

gulp.task('dist-img', function() {
    return gulp.src('img/**/*.*')
        .pipe(gulp.dest(`${argv.output_directory}/img`));
});

gulp.task('dist', ['dist-loader', 'dist-html', 'dist-img']);