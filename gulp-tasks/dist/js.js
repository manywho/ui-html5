module.exports = function(gulp, plugins) {
    return function() {
        var tsProject = plugins.typescript.createProject('tsconfig.json', {
            typescript: require('typescript')
        });

        return gulp.src(['js/**/*.ts', 'js/**/*.tsx'])
            .pipe(plugins.typescript(tsProject))
            .pipe(plugins.addSrc(['js/**/*.js', '!js/vendor/*.js', '!js/services/loader.js', '!js/services/ajaxproxy.js', '!js/services/ajaxproxy2.js']))
            .pipe(plugins.order(['services/*.js', 'lib/*.js', 'components/mixins.js', 'components/*.js']))
            .pipe(plugins.concat('compiled.js'))
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.uglify({
                preserveComments: 'license'
            }).on('error', plugins.util.log))
            .pipe(plugins.rev())
            .pipe(plugins.sourcemaps.write('.'))
            .pipe(gulp.dest('./dist/js'))       
    }
}