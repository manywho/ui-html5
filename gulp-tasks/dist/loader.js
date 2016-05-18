module.exports = function(gulp, plugins) {
    return function() {
        gulp.src(['js/services/loader.js'])
            .pipe(plugins.uglify())
            .pipe(plugins.rename('loader.min.js'))
            .pipe(gulp.dest('./dist/js'));
    }
}