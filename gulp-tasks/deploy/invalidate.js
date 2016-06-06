var aws = require('aws-sdk');

module.exports = function(gulp, plugins) {
    return function() {
        console.log('Invalidating hashes.json & loader');

        var params = {
            DistributionId: process.env.BAMBOO_CDNDISTRIBUTIONID,
            InvalidationBatch: {
                CallerReference: 'deploy-' + Math.random(),
                Paths: {
                    Quantity: 2,
                    Items: ['/hashes.json', '/js/vendor/vendor.json', '/js/loader.min.js']
                }
            }
        };

        var cloudfront = new aws.CloudFront({
            accessKeyId: process.env.BAMBOO_AWSKEY,
            secretAccessKey: process.env.BAMBOO_AWSSECRET,
            region: process.env.BAMBOO_CDNREGION,
        });

        cloudfront.createInvalidation(params, function (err, data) {

            if (err)
                console.log(err, err.stack);

            cb();

        });
    }
}