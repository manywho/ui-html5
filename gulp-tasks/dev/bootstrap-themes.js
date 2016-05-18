module.exports = function(gulp, plugins) {
    return function() {
        gulp.src('css/themes/*.less')
            .pipe(plugins.less())
            .pipe(plugins.replace('.mw-bs html {', '.mw-bs {'))
            .pipe(plugins.replace('.mw-bs body {', '.mw-bs {'))
            .pipe(gulp.dest('build/css/themes'));
    }
}