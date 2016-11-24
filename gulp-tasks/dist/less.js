module.exports = function(gulp, plugins) {
    return function() {
        return gulp.src(['css/*.less', '!css/mw-bootstrap.less'])
            .pipe(plugins.addSrc(['css/lib/react-selectize.css', 'css/lib/bootstrap-datetimepicker.css', 'css/lib/jquery.textcomplete.css']))
            .pipe(plugins.concat('compiled.less'))
            .pipe(plugins.less())
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.cleanCss({
                advanced: true,
                keepSpecialComments: 0
            }))
            .pipe(plugins.rev())
            .pipe(plugins.sourcemaps.write('.'))
            .pipe(gulp.dest('./dist/css'))
    }
}