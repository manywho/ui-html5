module.exports = function(gulp, plugins) {
    return function() {
        return gulp.src('css/themes/*.less')
            .pipe(plugins.less())
            .pipe(plugins.replace('.mw-bs html {', '.mw-bs {'))
            .pipe(plugins.replace('.mw-bs body {', '.mw-bs {'))
            .pipe(plugins.cleanCss({
                keepSpecialComments: 0
            }))
            .pipe(gulp.dest('./dist/css/themes'));
    }
}