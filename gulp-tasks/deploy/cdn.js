module.exports = function(gulp, plugins, argv, cacheControl, src) {
    return function() {
        var distribution = {
            region: argv.region,
            params: {
                Bucket: argv.bucket,
            },
            accessKeyId: argv.key,
            secretAccessKey: argv.secret
        };

        var publisher = plugins.awspublish.create(distribution);
        var headers = { 'Cache-Control': cacheControl };

        return gulp.src(src, { base: './dist' })
            .pipe(plugins.awspublish.gzip())
            .pipe(publisher.publish(headers, { force: true }))
            .pipe(plugins.awspublish.reporter());
    }
}