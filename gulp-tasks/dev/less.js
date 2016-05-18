module.exports = function(gulp, plugins, browserSync) {
    return function() {
        gulp.src(['css/*.less', '!css/mw-bootstrap.less'])
            .pipe(plugins.lesshint())
            .pipe(plugins.lesshint.reporter())
            .pipe(plugins.less())
            .pipe(gulp.dest('build/css'))
            .pipe(browserSync.stream());
    }
}