module.exports = function(gulp, plugins) {
    return function() {
        gulp.src('js/**/*.js')
            .pipe(gulp.dest('build/js'));
    }
};