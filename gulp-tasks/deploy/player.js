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
        var headers = {};

        return gulp.src(['dist/default.html'])
                    .pipe(plugins.replace('{{cdnurl}}', argv.cdnurl))
                    .pipe(plugins.replace('{{baseurl}}', argv.baseurl))
                    .pipe(plugins.rename(argv.tenant + '.' + argv.player))
                    .pipe(publisher.publish(headers, { force: true }))
                    .pipe(plugins.awspublish.reporter())
    }
};