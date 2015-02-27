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
    rename = require("gulp-rename"),
    replace = require('gulp-replace'),
    aws = require('aws-sdk'),
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
        tenant: argv.tenant,
        flow: argv.flow,
        version: argv.version,
        state: argv.state
    };

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

gulp.task('chosen-dist', function () {

    return gulp.src('css/lib/*.png')
                .pipe(gulp.dest('./dist/css'));

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

    return gulp.src(['js/**/*.js', '!js/services/loader.js'])
                .pipe(order(['services/*.js', 'components/*.js']))
                .pipe(concat('compiled.js'))
                .pipe(uglify())
                .pipe(gulp.dest('./dist/js'));

});

gulp.task('js-loader-dist', function () {

    return gulp.src(['js/services/loader.js'])
                .pipe(uglify())
                .pipe(rename('loader.min.js'))
                .pipe(gulp.dest('./dist/js'));

});

gulp.task('html-dist', function () {

    return gulp.src('flow.html')
                .pipe(replace('baseUrl: \'\'', 'baseUrl: \'' + process.env.BAMBOO_BASEURL + '\''))
                .pipe(replace('cdnUrl: \'\'', 'cdnUrl: \'' + process.env.BAMBOO_CDNURL + '\''))
                .pipe(htmlreplace({
                    css: '',
                    js: '',
                    log: '',
                    bootstrap: '',
                    loader: process.env.BAMBOO_CDNURL + '/js/loader.min.js'
                }))
                .pipe(rename('default.html'))
                .pipe(gulp.dest('./dist/'));
});

gulp.task('rev-dist', function () {

    return gulp.src(['dist/**', '!dist/*.html'])
                .pipe(revall({ ignore: ['/css/themes/.*css', '/css/fonts/.*', '/css/.*png', 'js/loader.min.js'] }))
                .pipe(gulp.dest('./dist/'))
                .pipe(revall.manifest({ fileName: 'hashes.json' }))
                .pipe(gulp.dest('./dist/'))
});

gulp.task('dist', function () {

    runSequence('clean-dist',
                ['less-dist', 'js-dist', 'js-loader-dist', 'bootstrap-dist', 'bootstrap-themes-dist', 'fonts-dist', 'chosen-dist'],
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

    return gulp.src(['dist/**/*.*', '!dist/default.html', '!dist/css/compiled.css', '!dist/css/mw-bootstrap.css', '!dist/js/compiled.js'])
                .pipe(awspublish.gzip())
                .pipe(publisher.publish(headers))
                .pipe(awspublish.reporter())

});

gulp.task('invalidate', function (cb) {

    console.log('Invalidating hashes.json');

    var params = {
        DistributionId: process.env.BAMBOO_CDNDISTRIBUTIONID,
        InvalidationBatch: { 
            CallerReference: 'deploy-' + Math.random(),
            Paths: {
                Quantity: 1,
                Items: ['/hashes.json']
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

gulp.task('deploy-players', function () {

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
                .pipe(rename(tenantId + '.' + argv.player))
                .pipe(publisher.publish(headers))
                .pipe(awspublish.reporter())

});

gulp.task('deploy', function () {

    runSequence('deploy-cdn',
                'deploy-players',
                'invalidate');

});