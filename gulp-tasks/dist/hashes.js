module.exports = function(gulp, plugins) {
    return function() {
        gulp.src('dist/hashes.json')        
            .pipe(plugins.jsonEditor(function(hashes) {
                for (hash in hashes) {
                    if (hashes[hash].indexOf('.css') != -1)
                        hashes[hash] = '/css/' + hashes[hash]
                    else if (hashes[hash].indexOf('.js') != -1)
                        hashes[hash] = '/js/' + hashes[hash]
                }
                return hashes;
            }))
            .pipe(gulp.dest('./dist'))
    }
}