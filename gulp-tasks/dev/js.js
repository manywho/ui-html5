module.exports = function(gulp, plugins) {
    return function() {
        return gulp.src('js/**/*.js')
            .pipe(gulp.dest('build/js'));
    }
};