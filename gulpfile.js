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
    runSequence = require('run-sequence'),
    order = require("gulp-order"),
    awspublish = require('gulp-awspublish'),
    cloudfront = require("gulp-cloudfront"),
    rename = require("gulp-rename");


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

    return gulp.src('dist', { read: false })
                .pipe(clean({ force: true }));

});

gulp.task('less-dist', function () {

    return gulp.src('css/*.less')
                .pipe(concat('compiled.less'))
                .pipe(less())
                .pipe(minifyCSS())
                .pipe(rev())
                .pipe(gulp.dest('./dist/css'));

});

gulp.task('js-dist', function () {

    return gulp.src(['js/**/*.js'])
                .pipe(order(['services/*.js', 'components/*.js']))
                .pipe(concat('compiled.js'))
                .pipe(uglify())
                .pipe(rev())
                .pipe(gulp.dest('./dist/js'));

});

gulp.task('html-dist', function () {

    var compiledCss = path.basename(glob.sync('dist/css/compiled*.css')[0]);
    var compiledJs = path.basename(glob.sync('dist/js/compiled*.js')[0]);
    
    return gulp.src('index.html')
                .pipe(htmlreplace({
                    css: path.join("css/", compiledCss),
                    js: path.join("js/", compiledJs),
                    log: ''
                }))
                .pipe(gulp.dest('./dist/'));
});

gulp.task('dist', function () {

    runSequence('clean-dist',
                ['less-dist', 'js-dist'],
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
