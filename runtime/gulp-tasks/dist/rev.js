module.exports = function(gulp, plugins) {
    return function() {
        gulp.src(['dist/**', '!dist/*.html', '!dist/js/vendor/*.js', '!dist/js/vendor/vendor.json', '!dist/js/loader.min.js'])
            .pipe(plugins.revall({ ignore: ['/css/themes/.*css', '/css/fonts/.*', '/css/.*png'] }))
            .pipe(gulp.dest('./dist/'))
            .pipe(plugins.revall.manifest({ fileName: 'hashes.json' }))
            .pipe(gulp.dest('./dist/'))
    }
}