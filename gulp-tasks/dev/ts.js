module.exports = function(gulp, plugins) {
    return function() {
        var tsProject = plugins.typescript.createProject('tsconfig.json');

        gulp.src(['js/**/*.ts', 'js/**/*.tsx'])
            .pipe(plugins.tslint())
            .pipe(plugins.tslint.report("verbose"))
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.typescript(tsProject))
            .pipe(plugins.sourcemaps.write())
            .pipe(gulp.dest('build/js'));
    }
};