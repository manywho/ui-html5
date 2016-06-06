module.exports = function(gulp, plugins) {
    return function() {
        gulp.src('js/**/*.ts')
            .pipe(plugins.typescript({
                target: 'ES5',
                jsx: 'react',
            }))
            .pipe(plugins.addSrc(['js/**/*.js', '!js/vendor/*.js', '!js/services/loader.js', '!js/services/ajaxproxy.js', '!js/services/ajaxproxy2.js']))
            .pipe(plugins.order(['services/*.js', 'lib/*.js', 'components/mixins.js', 'components/*.js']))
            .pipe(plugins.concat('compiled.js'))
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.uglify().on('error', plugins.util.log))
            .pipe(plugins.rev())
            .pipe(plugins.sourcemaps.write('.'))
            .pipe(gulp.dest('./dist/js'))       
    }
}
}