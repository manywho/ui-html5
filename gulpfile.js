var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var argv = require('yargs').default('platform_uri', '').default('output_directory', './dist').argv;

// Dev
gulp.task('refresh', function () {
    // build html from template
    let platform_uri = 'https://development.manywho.net';
    if (process.env.platform_uri && process.env.platform_uri !== '') {
        platform_uri = process.env.platform_uri;
    }
    gulp.src('debug.html')
        .pipe(plugins.replace('{{{platform_uri}}}', platform_uri))
        .pipe(plugins.rename('index.html'))
        .pipe(gulp.dest('.'));
    // webpack server with local html and cors
    browserSync.init({
        server: {
            baseDir: './',
            index: 'index.html',
            middleware: function (req, res, next) {
                res.setHeader('Access-Control-Allow-Origin', '*');
                next();
            },
        },
        ghostMode: false,
        open: false,
    });
    // when files change, reload
    gulp.watch(['build/**/*.*']).on('change', browserSync.reload);
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

gulp.task('dist', gulp.parallel('dist-loader', 'dist-html', 'dist-img'));
