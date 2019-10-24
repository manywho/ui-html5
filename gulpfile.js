var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var argv = require('yargs')
    .default('platform_uri', '')
    .default('output_directory', './dist')
    .argv;

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

gulp.task('dist-vendor', () => {
    const { PACKAGE_VERSION } = process.env;

    if (!PACKAGE_VERSION) {
        throw new Error('A version number must be supplied for a production build. eg. 1.0.0');
    }

    const filename = `flow-vendor-${PACKAGE_VERSION}.js`;

    return gulp
        .src('js/vendor/**/*.*')
        .pipe(plugins.concat(filename))
        .pipe(plugins.file('vendor.json', `{ "vendor": "/js/vendor/${filename}" }`))
        .pipe(gulp.dest(`${argv.output_directory}/js/vendor`));
});

gulp.task('dist', ['dist-loader', 'dist-vendor', 'dist-html', 'dist-img']);
