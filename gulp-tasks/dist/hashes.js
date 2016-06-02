module.exports = function(gulp, plugins) {
    return function() {
        gulp.src('dist/hashes.json')        
            .pipe(plugins.jsonEditor(function(hashes) {
                for (hash in hashes) {
                    hashes[hash] = '/' + hashes[hash]
                }
                return hashes;
            }))
            .pipe(gulp.dest('./dist'))
    }
}