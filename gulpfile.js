var gulp = require('gulp'),
    browserSync = require('browser-sync');
    less = require('gulp-less'),
    watch = require('gulp-watch'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    plumber = require('gulp-plumber'),
    concat = require('gulp-concat'),
    minifyCSS = require('gulp-minify-css'),
    revall = require('gulp-rev-all'),
    clean = require('gulp-clean'),
    uglify = require('gulp-uglify'),
    htmlreplace = require('gulp-html-replace'),
    glob = require('glob'),
    runSequence = require('run-sequence'),
    order = require("gulp-order"),
    awspublish = require('gulp-awspublish'),
    cloudfront = require("gulp-cloudfront"),
    rename = require("gulp-rename"),
    replace = require('gulp-replace'),
    argv = require('yargs').argv;


// Dev Time
gulp.task('less', function () {

    gulp.src(['css/*.less', '!css/mw-bootstrap.less'])
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

gulp.task('bootstrap', function () {

    gulp.src('css/mw-bootstrap.less')
        .pipe(less())
        .pipe(replace('.mw-bs html {', '.mw-bs {'))
        .pipe(replace('.mw-bs body {', '.mw-bs {'))
        .pipe(gulp.dest('css'));

});

gulp.task('bootstrap-templates', function () {

    gulp.src('css/themes/*.less')
        .pipe(less())
        .pipe(replace('.mw-bs html {', '.mw-bs {'))
        .pipe(replace('.mw-bs body {', '.mw-bs {'))
        .pipe(gulp.dest('css/themes'));

});

gulp.task('options', function () {

    var options = {
        tenantId: argv.tenant,
        flowId: {
            id: argv.flow,
            versionId: argv.version
        },
        stateId: argv.state,
    }

    var scriptTag = '<script>';
    scriptTag += 'var devOptions = ';
    scriptTag += JSON.stringify(options);
    scriptTag += '</script>';

    gulp.src('flow.html')
        .pipe(replace('<!-- options -->', scriptTag))
        .pipe(rename('flow-run.html'))
        .pipe(gulp.dest('.'));

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
            baseDir: '.',
            index: 'flow-run.html'
        },
        ghostMode: false
    });

});

gulp.task('refresh', ['options', 'jshint', 'less', 'bootstrap', 'bootstrap-templates', 'browser-sync']);

// Production Build
gulp.task('clean-dist', function () {

    return gulp.src('dist', { read: false })
                .pipe(clean({ force: true }));

});

gulp.task('less-dist', function () {

    return gulp.src(['css/*.less', '!css/mw-bootstrap.less', 'css/lib/bootstrap-chosen.css'])
                .pipe(concat('compiled.less'))
                .pipe(less())
                .pipe(minifyCSS())
                .pipe(gulp.dest('./dist/css'));

});

gulp.task('fonts-dist', function () {

    return gulp.src('css/fonts/*.*')
                .pipe(gulp.dest('./dist/css/fonts'));

});

gulp.task('bootstrap-dist', function () {

    return gulp.src('css/mw-bootstrap.less')
                .pipe(less())
                .pipe(replace('.mw-bs html {', '.mw-bs {'))
                .pipe(replace('.mw-bs body {', '.mw-bs {'))
                .pipe(minifyCSS())
                .pipe(gulp.dest('./dist/css'));

});

gulp.task('bootstrap-themes-dist', function () {

    return gulp.src('css/themes/*.less')
                .pipe(less())
                .pipe(replace('.mw-bs html {', '.mw-bs {'))
                .pipe(replace('.mw-bs body {', '.mw-bs {'))
                .pipe(minifyCSS())
                .pipe(gulp.dest('./dist/css/themes'));

});

gulp.task('js-dist', function () {

    return gulp.src(['js/**/*.js'])
                .pipe(order(['services/*.js', 'components/*.js']))
                .pipe(concat('compiled.js'))
                .pipe(uglify())
                .pipe(gulp.dest('./dist/js'));

});

gulp.task('html-dist', function () {

    return gulp.src('flow.html')
                .pipe(htmlreplace({
                    css: 'css/compiled.css',
                    js: 'js/compiled.js',
                    log: ''
                }))
                .pipe(rename('default.html'))
                .pipe(gulp.dest('./dist/'));
});

gulp.task('dist', function () {

    runSequence('clean-dist',
                ['less-dist', 'js-dist', 'bootstrap-dist', 'bootstrap-themes-dist', 'fonts-dist'],
                'html-dist');

});

// Deploy
gulp.task('deploy-cdn', function () {

    var aws = {
        key: process.env.BAMBOO_AWSKEY,
        secret: process.env.BAMBOO_AWSSECRET,
        bucket: process.env.BAMBOO_CDNBUCKET,
        region: process.env.BAMBOO_CDNREGION,
        distributionId: process.env.BAMBOO_CDNDISTRIBUTIONID
    };

    var publisher = awspublish.create(aws);
    var headers = { 'Cache-Control': 'max-age=315360000, no-transform, public' };

    return gulp.src(['dist/**'])
                .pipe(revall())
                .pipe(awspublish.gzip())
                .pipe(publisher.publish(headers))
                .pipe(publisher.cache())
                .pipe(awspublish.reporter())
                .pipe(cloudfront(aws));

});

gulp.task('deploy-players', function () {

    var aws = {
        key: process.env.BAMBOO_AWSKEY,
        secret: process.env.BAMBOO_AWSSECRET,
        bucket: process.env.BAMBOO_CDNBUCKET,
        region: process.env.BAMBOO_CDNREGION,
    };

    var tenantId = argv.tenant;
    var publisher = awspublish.create(aws);
    var headers = { 'Cache-Control': 'max-age=315360000, no-transform, public' };

    return gulp.src(['dist/default.html'])
                .pipe(rename(tenantId + '.default'))
                .pipe(awspublish.gzip())
                .pipe(publisher.publish(headers))
                .pipe(awspublish.reporter())

});
