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
        var headers = { 'Cache-Control': 'max-age=315360000, no-transform, public' };

        if (process.env.BAMBOO_CDNDISTRIBUTIONID == "staging") {
            headers = null;
        }

        return gulp.src(['dist/**/*.*', '!dist/hashes.json', '!dist/js/vendor/vendor.json', '!dist/js/loader.min.js', '!dist/default.html', '!dist/css/compiled.css', '!dist/css/mw-bootstrap.css', '!dist/js/compiled.js', '!dist/js/compiled.js.map'])
            .pipe(awspublish.gzip())
            .pipe(publisher.publish(headers, { force: true }))
            .pipe(awspublish.reporter());
    }
}