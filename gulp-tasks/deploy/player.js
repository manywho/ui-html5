module.exports = function(gulp, plugins, browserSync, argv) {
    return function() {
        var distribution = {
            key: process.env.BAMBOO_AWSKEY,
            secret: process.env.BAMBOO_AWSSECRET,
            bucket: process.env.BAMBOO_PLAYERSBUCKET,
            region: process.env.BAMBOO_CDNREGION
        };

        var tenantId = argv.tenant;
        var publisher = plugins.awspublish.create(distribution);
        var headers = {};

        return gulp.src(['dist/default.html'])
                    .pipe(plugins.replace('{{cdnurl}}', process.env.BAMBOO_CDNURL))
                    .pipe(plugins.replace('{{baseurl}}', process.env.BAMBOO_BASEURL))
                    .pipe(plugins.rename(tenantId + '.' + argv.player))
                    .pipe(publisher.publish(headers))
                    .pipe(plugins.awspublish.reporter())
    }
};