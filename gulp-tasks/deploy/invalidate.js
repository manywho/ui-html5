var aws = require('aws-sdk');
var glob = require('glob');

module.exports = function(gulp, plugins) {
    return function() {
        console.log('Invalidating hashes.json & loader');

        var items = ['/hashes.json', '/js/vendor/vendor.json', '/js/loader.min.js'];
        items = items.concat(glob.sync('css/themes/mw-*.less').map(theme => '/' + theme.replace('.less', '.css')));

        var params = {
            DistributionId: process.env.BAMBOO_CDNDISTRIBUTIONID,
            InvalidationBatch: {
                CallerReference: 'deploy-' + Math.random(),
                Paths: {
                    Quantity: items.length,
                    Items: items
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
        });
    }
}