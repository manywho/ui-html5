module.exports = function(gulp, plugins) {
    return function() {
        gulp.src('js/**/*.ts')
            .pipe(plugins.tslint())
            .pipe(plugins.tslint.report("verbose"))
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.typescript({
                target: 'ES5',
                allowJs: true,
                jsx: 'react',
            }))
            .pipe(plugins.sourcemaps.write())
            .pipe(gulp.dest('build/js'));
    }
}