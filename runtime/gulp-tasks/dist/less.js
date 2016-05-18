module.exports = function(gulp, plugins) {
    return function() {
        gulp.src(['css/*.less', '!css/mw-bootstrap.less', 'css/lib/react-select.css', 'css/lib/bootstrap-datetimepicker.css', 'css/lib/jquery.textcomplete.css'])
            .pipe(plugins.lesshint())
            .pipe(plugins.lesshint.reporter())
            .pipe(plugins.concat('compiled.less'))
            .pipe(plugins.less())
            .pipe(plugins.minifyCSS())
            .pipe(gulp.dest('./dist/css'));
    }
}