module.exports = function(gulp, plugins) {
    return function() {
        gulp.src('css/mw-bootstrap.less')
            .pipe(plugins.less())
            .pipe(plugins.replace('.mw-bs html {', '.mw-bs {'))
            .pipe(plugins.replace('.mw-bs body {', '.mw-bs {'))
            .pipe(plugins.cleanCss({
                keepSpecialComments: 0
            }))
            .pipe(plugins.rev())
            .pipe(gulp.dest('./dist/css'))
            .pipe(plugins.rev.manifest('hashes.json', { merge: true }))
            .pipe(gulp.dest('./dist'))
    }
}