var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var argv = require('yargs').argv;
var fs = require('fs');
var glob = require("glob");

function getDeployTask(task, cacheControl, src) {
    return require('./gulp-tasks/deploy/' + task)(gulp, plugins, argv, cacheControl, src);
}

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
        ghostMode: false
    });

    gulp.watch(['ui-core/build/**/*.*', 'debug.html']).on('change', browserSync.reload);
    gulp.watch(['ui-bootstrap/build/**/*.*', 'debug.html']).on('change', browserSync.reload);
    gulp.watch(['ui-offline/build/**/*.*', 'debug.html']).on('change', browserSync.reload);
});

// Dist

gulp.task('dist-loader', function() {
    return gulp.src('js/loader.js')
        .pipe(plugins.uglify())
        .pipe(plugins.rename('loader.min.js'))
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('dist-vendor', function () {
    return gulp.src(['js/vendor/*.js', 'js/vendor/vendor.json']).pipe(gulp.dest('./dist/js/vendor'));
});

gulp.task('dist-html', function () {
    return gulp.src('default.html').pipe(gulp.dest('./dist/'));
});

gulp.task('dist-hashes', function() { 
    var resources = glob.sync('./dist/**/ui-*.*', {
        ignore: ['./dist/**/*.json', './dist/**/loader.min.js']
    });

    var css = glob.sync('./dist/**/+(ui|mw)-*.css', { ignore: ['./dist/**/themes/*.*'] });
    var js = glob.sync('./dist/**/*-ui-*.js', { ignore: ['./dist/**/loader.min.js'] });
     
    var replacer = function(item) { return item.replace('./dist/', '/')}

    fs.writeFileSync('dist/hashes.json', JSON.stringify([].concat(css, js).map(replacer), null, 4), 'utf8');    
});

gulp.task('dist', ['dist-loader', 'dist-vendor', 'dist-html', 'dist-hashes']);

// Deploy
gulp.task('deploy-assets', getDeployTask('cdn', 'max-age=315360000, no-transform, public', ['dist/js/*.js', 'dist/js/*.js.map', 'dist/css/*.css', 'dist/css/*.css.map', '!dist/js/loader.min.js']));
gulp.task('deploy-loader', getDeployTask('cdn', 'no-cache', ['dist/js/loader.min.js']));
gulp.task('deploy-hashes', getDeployTask('cdn', 'no-cache', ['dist/hashes.json', 'dist/js/vendor/vendor.json']));
gulp.task('deploy-players', getDeployTask('player'));
