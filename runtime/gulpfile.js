var gulp = require('gulp'),
    browserSync = require('browser-sync');
    less = require('gulp-less'),
    watch = require('gulp-watch'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    plumber = require('gulp-plumber'),
    concat = require('gulp-concat'),
    minifyCSS = require('gulp-minify-css'),
    del = require('del'),
    revall = require('gulp-rev-all'),
    uglify = require('gulp-uglify'),
    runSequence = require('run-sequence'),
    order = require("gulp-order"),
    awspublish = require('gulp-awspublish'),
    rename = require("gulp-rename"),
    replace = require('gulp-replace'),
    aws = require('aws-sdk'),
    gutil = require('gulp-util'),
    sourcemaps = require('gulp-sourcemaps'),
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
            index: 'debug.html',
            middleware: function (req, res, next) {
                res.setHeader('Access-Control-Allow-Origin', '*');
                next();
            }
        },
        ghostMode: false
    });

});

gulp.task('refresh', ['jshint', 'less', 'bootstrap', 'bootstrap-templates', 'browser-sync']);

// Production Build
gulp.task('clean-dist', function (cb) {

    del(['dist'], cb);

});

gulp.task('less-dist', function () {

    return gulp.src(['css/*.less', '!css/mw-bootstrap.less', 'css/lib/react-select.css', 'css/lib/bootstrap-datetimepicker.css', 'css/lib/jquery.textcomplete.css'])
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

    return gulp.src(['js/**/*.js', '!js/vendor/*.js', '!js/services/loader.js', '!js/services/ajaxproxy.js', '!js/services/ajaxproxy2.js'])
                .pipe(order(['services/*.js', 'lib/*.js', 'components/mixins.js', 'components/*.js']))
                .pipe(concat('compiled.js'))
                .pipe(sourcemaps.init())
                .pipe(uglify().on('error', gutil.log))
                .pipe(sourcemaps.write('.'))
                .pipe(gulp.dest('./dist/js'));

});

gulp.task('js-vendor-dist', function () {

    return gulp.src(['js/vendor/*.js'])
                .pipe(gulp.dest('./dist/js/vendor'));

});

gulp.task('js-loader-dist', function () {

    return gulp.src(['js/services/loader.js'])
                .pipe(uglify())
                .pipe(rename('loader.min.js'))
                .pipe(gulp.dest('./dist/js'));

});

gulp.task('html-dist', function () {

    return gulp.src('default.html')
            .pipe(gulp.dest('./dist/'));

});

gulp.task('rev-dist', function () {

    return gulp.src(['dist/**', '!dist/*.html', '!dist/js/vendor/*.js'])
                .pipe(revall({ ignore: ['/css/themes/.*css', '/css/fonts/.*', '/css/.*png', 'js/loader.min.js'] }))
                .pipe(gulp.dest('./dist/'))
                .pipe(revall.manifest({ fileName: 'hashes.json' }))
                .pipe(gulp.dest('./dist/'))
});

gulp.task('dist', function () {

    runSequence('clean-dist',
                ['less-dist', 'js-dist', 'js-loader-dist', 'bootstrap-dist', 'bootstrap-themes-dist', 'fonts-dist', 'chosen-dist', 'js-vendor-dist'],
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

    return gulp.src(['dist/**/*.*', '!dist/hashes.json', '!dist/js/loader.min.js', '!dist/default.html', '!dist/css/compiled.css', '!dist/css/mw-bootstrap.css', '!dist/js/compiled.js', '!dist/js/compiled.js.map'])
                .pipe(awspublish.gzip())
                .pipe(publisher.publish(headers))
                .pipe(awspublish.reporter())

});

gulp.task('deploy-short-cache', function () {

    var distribution = {
        key: process.env.BAMBOO_AWSKEY,
        secret: process.env.BAMBOO_AWSSECRET,
        bucket: process.env.BAMBOO_CDNBUCKET,
        region: process.env.BAMBOO_CDNREGION,
        distributionId: process.env.BAMBOO_CDNDISTRIBUTIONID
    };

    var publisher = awspublish.create(distribution);
    var headers = { 'Cache-Control': 'max-age=600, no-transform, public' };

    if (process.env.BAMBOO_CDNDISTRIBUTIONID == "staging") {
        headers = null;
    }

    return gulp.src(['dist/hashes.json', 'dist/js/loader.min.js'])
                .pipe(rename(function(path) {
                    if (path.basename == "loader.min") {
                        path.dirname = "js"
                    }
                }))
                .pipe(awspublish.gzip())
                .pipe(publisher.publish(headers))
                .pipe(awspublish.reporter())

});

gulp.task('invalidate', function (cb) {

    console.log('Invalidating hashes.json & loader');

    var params = {
        DistributionId: process.env.BAMBOO_CDNDISTRIBUTIONID,
        InvalidationBatch: {
            CallerReference: 'deploy-' + Math.random(),
            Paths: {
                Quantity: 2,
                Items: ['/hashes.json', '/js/loader.min.js']
            }
        }
    };

    var cloudfront = new aws.CloudFront({
        accessKeyId: process.env.BAMBOO_AWSKEY,
        secretAccessKey: process.env.BAMBOO_AWSSECRET,
        region: process.env.BAMBOO_CDNREGION,
    });

    cloudfront.createInvalidation(params, function (err, data) {

        if (err) {

            console.log(err, err.stack);

        }

        cb();

    });

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

    return gulp.src(['dist/default.html'])
                .pipe(replace('{{cdnurl}}', process.env.BAMBOO_CDNURL))
                .pipe(replace('{{baseurl}}', process.env.BAMBOO_BASEURL))
                .pipe(rename(tenantId + '.' + argv.player))
                .pipe(publisher.publish(headers))
                .pipe(awspublish.reporter())

});
