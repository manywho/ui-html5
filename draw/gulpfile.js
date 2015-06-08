var gulp = require('gulp'),
    less = require('gulp-less'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    concat = require('gulp-concat'),
    minifyCSS = require('gulp-minify-css'),
    del = require('del'),
    RevAll = require('gulp-rev-all'),
    uglify = require('gulp-uglify'),
    runSequence = require('run-sequence'),
    order = require("gulp-order"),
    awspublish = require('gulp-awspublish'),
    rename = require("gulp-rename"),
    replace = require('gulp-replace'),
    aws = require('aws-sdk'),
    gutil = require('gulp-util'),
    sourcemaps = require('gulp-sourcemaps'),
    argv = require('yargs').argv
    url = require('url');

gulp.task('less', function () {

    gulp.src(['css/*.less'])
        .pipe(watch('css/*.less'))
        .pipe(less())
        .pipe(gulp.dest('css'));

});

gulp.task('jshint', function () {

    gulp.src('js/*.js')
        .pipe(watch('js/*.js'))
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(jshint.reporter('fail'));

});

// Production Build
gulp.task('clean-dist', function (cb) {

    del(['dist'], cb);

});

gulp.task('less-dist', function () {

    return gulp.src(['css/*.less'])
                .pipe(concat('compiled.less'))
                .pipe(less())
                .pipe(minifyCSS())
                .pipe(gulp.dest('./dist/css'));

});

gulp.task('fonts-dist', function () {

    return gulp.src('css/fonts/*.*')
                .pipe(gulp.dest('./dist/css/fonts'));

});

gulp.task('vendor-dist', function () {

    return gulp.src('css/vendor/*.*')
                .pipe(gulp.dest('./dist/css/vendor'));

});

gulp.task('themes-dist', function () {

    return gulp.src('css/themes/*.*')
                .pipe(gulp.dest('./dist/css/themes'));

});

gulp.task('js-dist', function () {

    return gulp.src(['js/**/*.js'])
                .pipe(order(['services/*.js', 'components/*.js', 'configuration/*.js', '*.js']))
                .pipe(concat('compiled.js'))
                .pipe(sourcemaps.init())
                .pipe(uglify().on('error', gutil.log))
                .pipe(sourcemaps.write('.'))
                .pipe(gulp.dest('./dist/js'));

});

gulp.task('html-dist', function () {

    return gulp.src('draw.html')
            .pipe(replace('{{cdnurl}}', process.env.BAMBOO_CDNURL))
            .pipe(replace('{{baseurl}}', process.env.BAMBOO_BASEURL))
            .pipe(gulp.dest('./dist/'));

});

gulp.task('rev-dist', function () {

    var revAll = new RevAll({
        dontGlobal: ['css/themes/.*css', 'css/fonts/.*', 'css/.*png'],
        dontRenameFile: ['draw.html', 'css/vendor/bootstrap.min.css'],
        transformPath: function (rev, source, path) {

            // For compiled.js and compiled.css prefix manually with the cdn path
            if (source.indexOf("compiled") != -1) {

                return process.env.BAMBOO_CDNURL + '/draw/' + rev;

            }

            return rev;

        },
        debug: true
    });

    return gulp.src(['dist/**'])
                .pipe(revAll.revision())
                .pipe(gulp.dest('./dist/'));

});

gulp.task('dist', function () {

    runSequence('clean-dist',
                ['less-dist', 'js-dist', 'vendor-dist', 'themes-dist', 'fonts-dist'],
                'less-dist',
                'html-dist',
                'rev-dist');

});

// Deploy
gulp.task('deploy-cdn', function () {

    var distribution = {
        key: process.env.BAMBOO_AWSKEY,
        secret: process.env.BAMBOO_AWSSECRET,
        bucket: process.env.BAMBOO_CDNBUCKET,
        region: process.env.BAMBOO_CDNREGION,
        distributionId: process.env.BAMBOO_CDNDISTRIBUTIONID
    };

    var publisher = awspublish.create(distribution);
    var headers = { 'Cache-Control': 'max-age=315360000, no-transform, public' };

    if (process.env.BAMBOO_CDNDISTRIBUTIONID == "staging") {
        headers = null;
    }

    return gulp.src(['dist/**/*.*', '!dist/draw.html', '!dist/css/compiled.css', '!dist/js/compiled.js', '!dist/js/compiled.js.map'])
                .pipe(awspublish.gzip())
                .pipe(publisher.publish(headers))
                .pipe(awspublish.reporter());

});

gulp.task('deploy-player', function () {

    var distribution = {
        key: process.env.BAMBOO_AWSKEY,
        secret: process.env.BAMBOO_AWSSECRET,
        bucket: process.env.BAMBOO_PLAYERSBUCKET,
        region: process.env.BAMBOO_CDNREGION,
    };

    var tenantId = argv.tenant;
    var publisher = awspublish.create(distribution);
    var headers = {};

    return gulp.src(['dist/draw.html'])
                .pipe(rename(tenantId + '.draw'))
                .pipe(publisher.publish(headers))
                .pipe(awspublish.reporter())

});
