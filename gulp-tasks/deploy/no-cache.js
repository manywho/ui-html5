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
        var headers = { 'Cache-Control': 'no-cache' };

        if (process.env.BAMBOO_CDNDISTRIBUTIONID == "staging") {
            headers = null;
        }

        return gulp.src('dist/hashes.json')
            .pipe(awspublish.gzip())
            .pipe(publisher.publish(headers))
            .pipe(awspublish.reporter())
    }
}