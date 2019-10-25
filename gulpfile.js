var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var argv = require('yargs')
    .default('platform_uri', 'https://development.manywho.net')
    .default('output_directory', './dist')
    .argv;

// Dev
gulp.task('refresh', function () {

    browserSync.init({
        server: {
            baseDir: `./`,
            index: `${argv.output_directory}/players/${argv.tenant}.${argv.player}`,
            middleware: [
                function (req, res, next) {
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    next();
                }
            ],
        },
        ghostMode: false,
        open: false,
    });
    // when files change, reload
    gulp.watch([`${argv.output_directory}/**/*.*`]).on('change', browserSync.reload);
});


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

gulp.task('dist-bundle', function() {

    return gulp.src('bundle-template.json')
        .pipe(plugins.replace('{{version}}', argv.package_version))
        .pipe(plugins.rename('bundles.json'))
        .pipe(gulp.dest(`${argv.output_directory}`));
});

gulp.task('dist-vendor', () => {

    if (!argv.package_version) {
        throw new Error('A version number must be supplied. eg. 1.0.0');
    }

    const filename = `flow-vendor-${argv.package_version}.js`;

    return gulp
        .src('js/vendor/**/*.*')
        .pipe(plugins.concat(filename))
        .pipe(plugins.file('vendor.json', `{ "vendor": "/js/vendor/${filename}" }`))
        .pipe(gulp.dest(`${argv.output_directory}/js/vendor`));
});

gulp.task('dist', gulp.parallel(['dist-loader', 'dist-vendor', 'dist-html', 'dist-img', 'dist-bundle']));
gulp.task('dev', gulp.series(['dist', 'refresh']));
