var awspublish = require('gulp-awspublish');

module.exports = function(gulp, plugins) {
    return function() {
        var distribution = {
            key: process.env.BAMBOO_AWSKEY,
            secret: process.env.BAMBOO_AWSSECRET,
            bucket: process.env.BAMBOO_CDNBUCKET,
            region: process.env.BAMBOO_CDNREGION,
            distributionId: process.env.BAMBOO_CDNDISTRIBUTIONID
        };

        var publisher = awspublish.create(distribution);
        var headers = { 'Cache-Control': 'max-age=600, no-transform, public' };

        if (process.env.BAMBOO_CDNDISTRIBUTIONID == "staging") {
            headers = null;
        }

        return gulp.src(['dist/hashes.json', 'dist/js/vendor/vendor.json', 'dist/js/loader.min.js'])
            .pipe(plugins.rename(function(path) {
                console.log(path);
                if (path.basename == "loader.min") {
                    path.dirname = "js"
                }
                if (path.basename == "vendor") {
                    path.dirname= "js/vendor/"
                }
            }))
            .pipe(awspublish.gzip())
            .pipe(publisher.publish(headers))
            .pipe(awspublish.reporter())
    }
}