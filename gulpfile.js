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
    gulp.watch([`${argv.output_directory}/**/*.*`, 'template.html']).on('change', browserSync.reload);
});


// Build

gulp.task('loader', function() {
    return gulp.src('js/loader.js')
        .pipe(plugins.uglify())
        .pipe(plugins.rename('loader.min.js'))
        .pipe(gulp.dest(`${argv.output_directory}/js`));
});

gulp.task('html', function () {
    return gulp.src('template.html')
        .pipe(plugins.replace('{{cdnurl}}', argv.cdnurl))
        .pipe(plugins.replace('{{platform_uri}}', argv.platform_uri))
        .pipe(plugins.rename(argv.tenant + '.' + argv.player))
        .pipe(gulp.dest(`${argv.output_directory}/players/`));
});

gulp.task('img', function() {
    return gulp.src('img/**/*.*')
        .pipe(gulp.dest(`${argv.output_directory}/img`));
});

gulp.task('bundle', function() {

    if (!argv.package_version) {
        throw new Error('A version number must be supplied. eg. 1.0.0');
    }

    return gulp.src('bundle-template.json')
        .pipe(plugins.replace('{{version}}', argv.package_version))
        .pipe(plugins.rename('bundles.json'))
        .pipe(gulp.dest(`${argv.output_directory}`));
});

gulp.task('vendor', () => {

    if (!argv.package_version) {
        throw new Error('A version number must be supplied. eg. 1.0.0');
    }

    const filename = `flow-vendor-${argv.package_version}.js`;

    const libDirectory = argv.package_version === 'development' ? 'dev' : 'dist';

    return gulp
        .src([
            'js/vendor/jquery-*.js', // Ensure jquery is loaded first
            `js/vendor/${libDirectory}/jquery-migrate*.js`, // Ensure jquery migrate is loaded next
            `js/vendor/${libDirectory}/*.*`, // Rest of lib directory
            'js/vendor/*.*' // All of top level vendor directory
        ])
        .pipe(plugins.concat(filename))
        .pipe(plugins.file('vendor.json', `{ "vendor": "/js/vendor/${filename}" }`))
        .pipe(gulp.dest(`${argv.output_directory}/js/vendor`));
});

gulp.task('build', gulp.parallel(['loader', 'vendor', 'html', 'img', 'bundle']));
gulp.task('dev', gulp.series(['build', 'refresh']));
