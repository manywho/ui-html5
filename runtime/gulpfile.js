var gulp = require('gulp'),
    browserSync = require('browser-sync');
less = require('gulp-less'),
    watch = require('gulp-watch'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    plumber = require('gulp-plumber'),
    concat = require('gulp-concat'),
    minifyCSS = require('gulp-minify-css'),
    del = require('del'),
    revall = require('gulp-rev-all'),
    uglify = require('gulp-uglify'),
    runSequence = require('run-sequence'),
    order = require("gulp-order"),
    awspublish = require('gulp-awspublish'),
    rename = require("gulp-rename"),
    replace = require('gulp-replace'),
    aws = require('aws-sdk'),
    gutil = require('gulp-util'),
    sourcemaps = require('gulp-sourcemaps'),
    requestPromise = require('request-promise'),
    gulpPrompt = require('gulp-prompt'),
    fs = require('fs'),
    argv = require('yargs').argv;


// Dev Time
gulp.task('less', function () {

    gulp.src(['css/*.less', '!css/mw-bootstrap.less'])
        .pipe(plumber())
        .pipe(watch('css/*.less'))
        .pipe(less())
        .pipe(gulp.dest('css'));

});

gulp.task('jshint', function () {

    gulp.src('js/*.js')
        .pipe(plumber())
        .pipe(watch('js/*.js'))
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(jshint.reporter('fail'));

});

gulp.task('bootstrap', function () {

    gulp.src('css/mw-bootstrap.less')
        .pipe(less())
        .pipe(replace('.mw-bs html {', '.mw-bs {'))
        .pipe(replace('.mw-bs body {', '.mw-bs {'))
        .pipe(gulp.dest('css'));

});

gulp.task('bootstrap-templates', function () {

    gulp.src('css/themes/*.less')
        .pipe(less())
        .pipe(replace('.mw-bs html {', '.mw-bs {'))
        .pipe(replace('.mw-bs body {', '.mw-bs {'))
        .pipe(gulp.dest('css/themes'));

});

gulp.task('browser-sync', function () {

    var files = [
        '*.html',
        'css/**/*.css',
        'img/**/*.png',
        'js/**/*.js'
    ];

    browserSync.init(files, {
        server: {
            baseDir: '.',
            index: 'debug.html',
            middleware: function (req, res, next) {
                res.setHeader('Access-Control-Allow-Origin', '*');
                next();
            }
        },
        ghostMode: false
    });

});

gulp.task('refresh', ['jshint', 'less', 'bootstrap', 'bootstrap-templates', 'browser-sync']);

// Production Build
gulp.task('clean-dist', function (cb) {

    del(['dist'], cb);

});

gulp.task('less-dist', function () {

    return gulp.src(['css/*.less', '!css/mw-bootstrap.less', 'css/lib/react-select.css', 'css/lib/bootstrap-datetimepicker.css', 'css/lib/jquery.textcomplete.css'])
        .pipe(concat('compiled.less'))
        .pipe(less())
        .pipe(minifyCSS())
        .pipe(gulp.dest('./dist/css'));

});

gulp.task('fonts-dist', function () {

    return gulp.src('css/fonts/*.*')
        .pipe(gulp.dest('./dist/css/fonts'));

});

gulp.task('bootstrap-dist', function () {

    return gulp.src('css/mw-bootstrap.less')
        .pipe(less())
        .pipe(replace('.mw-bs html {', '.mw-bs {'))
        .pipe(replace('.mw-bs body {', '.mw-bs {'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('./dist/css'));

});

gulp.task('bootstrap-themes-dist', function () {

    return gulp.src('css/themes/*.less')
        .pipe(less())
        .pipe(replace('.mw-bs html {', '.mw-bs {'))
        .pipe(replace('.mw-bs body {', '.mw-bs {'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('./dist/css/themes'));

});

gulp.task('js-dist', function () {

    return gulp.src(['js/**/*.js', '!js/vendor/*.js', '!js/services/loader.js', '!js/services/ajaxproxy.js', '!js/services/ajaxproxy2.js'])
        .pipe(order(['services/*.js', 'lib/*.js', 'components/mixins.js', 'components/*.js']))
        .pipe(concat('compiled.js'))
        .pipe(sourcemaps.init())
        .pipe(uglify().on('error', gutil.log))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist/js'));

});

gulp.task('js-vendor-dist', function () {

    return gulp.src(['js/vendor/*.js', 'js/vendor/vendor.json'])
        .pipe(gulp.dest('./dist/js/vendor'));

});

gulp.task('js-loader-dist', function () {

    return gulp.src(['js/services/loader.js'])
        .pipe(uglify())
        .pipe(rename('loader.min.js'))
        .pipe(gulp.dest('./dist/js'));

});

gulp.task('html-dist', function () {

    return gulp.src('default.html')
        .pipe(gulp.dest('./dist/'));

});

gulp.task('rev-dist', function () {

    return gulp.src(['dist/**', '!dist/*.html', '!dist/js/vendor/*.js', '!dist/js/vendor/vendor.json', '!dist/js/loader.min.js'])
        .pipe(revall({ ignore: ['/css/themes/.*css', '/css/fonts/.*', '/css/.*png'] }))
        .pipe(gulp.dest('./dist/'))
        .pipe(revall.manifest({ fileName: 'hashes.json' }))
        .pipe(gulp.dest('./dist/'))
});

gulp.task('dist', function () {

    runSequence('clean-dist',
        ['less-dist', 'js-dist', 'js-loader-dist', 'bootstrap-dist', 'bootstrap-themes-dist', 'fonts-dist', 'js-vendor-dist'],
        'html-dist',
        'rev-dist');

});

// Deploy
gulp.task('deploy-cdn', function () {

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
        .pipe(publisher.publish(headers))
        .pipe(awspublish.reporter())

});

gulp.task('deploy-short-cache', function () {

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
        .pipe(rename(function(path) {
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

});

gulp.task('invalidate', function (cb) {

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

        if (err) {

            console.log(err, err.stack);

        }

        cb();

    });

});

gulp.task('deploy-player', function () {

    var distribution = {
        key: process.env.BAMBOO_AWSKEY,
        secret: process.env.BAMBOO_AWSSECRET,
        bucket: process.env.BAMBOO_PLAYERSBUCKET,
        region: process.env.BAMBOO_CDNREGION,
    };

    var tenantId = argv.tenant;
    var publisher = awspublish.create(distribution);
    var headers = {};

    return gulp.src(['dist/default.html'])
        .pipe(replace('{{cdnurl}}', process.env.BAMBOO_CDNURL))
        .pipe(replace('{{baseurl}}', process.env.BAMBOO_BASEURL))
        .pipe(rename(tenantId + '.' + argv.player))
        .pipe(publisher.publish(headers))
        .pipe(awspublish.reporter())

});

gulp.task('offline', function() {

    // Print our logo for a bit of fun
    console.log("                                                                    @@@@");
    console.log("                                                                    @@@@");
    console.log("  @@@@   @@@@       @@@@@       @@@@    @@@@  @@@@ @@@@ @@@@@ @@@@ @@@@@@@@@     @@@@@@");
    console.log("@@@@@@@@@@@@@@@  @@@@@@@@@@   @@@@@@@@  @@@@  @@@@ @@@@ @@@@@ @@@@ @@@@@@@@@@  @@@@@@@@@@");
    console.log("@@@@ @@@@@ @@@@ @@@@    @@@@ @@@@@@@@@@ @@@@  @@@@ @@@@ @@@@@ @@@@ @@@@  @@@@ @@@@    @@@@");
    console.log("@@@@ @@@@@ @@@@ @@@@    @@@@ @@@@  @@@@ @@@@  @@@@ @@@@ @@@@@ @@@@ @@@@  @@@@ @@@@    @@@@");
    console.log("@@@@ @@@@@ @@@@ @@@@@@@ @@@@ @@@@  @@@@ @@@@@@@@@@ @@@@@@@@@@@@@@@ @@@@  @@@@  @@@@@@@@@@");
    console.log("@@@@ @@@@@ @@@@   @@@@@ @@@@ @@@@  @@@@  @@@@@@@@@  @@@@@@ @@@@@@  @@@@  @@@@    @@@@@@");
    console.log("                                             @@@@@");
    console.log("                                           @@@@@@@");
    console.log("                                           @@@@@");

    runSequence('offline-build', ['jshint', 'less', 'bootstrap', 'bootstrap-templates']);

});

gulp.task('offline-build', function() {

    gulp.src('js/config/snapshot.js')
        .pipe(gulpPrompt.prompt([{
            type: 'input',
            name: 'username',
            message: 'What is your ManyWho username?'
        },
            {
                type: 'password',
                name: 'password',
                message: 'And your password?'
            },
            {
                type: 'input',
                name: 'flow',
                message: 'What is the name of the Flow you want to make offline?'
            },
            {
                type: 'input',
                name: 'build',
                message: 'What is the name of this build?'
            },
            {
                type: 'input',
                name: 'phonegap',
                message: 'Is this a PhoneGap build? (y/n)'
            }], function(res) {

            // Authenticate the user to the draw API
            requestPromise({
                method: "POST",
                uri: "https://flow.manywho.com/api/draw/1/authentication",
                body: {
                    "loginUrl": "https://flow.manywho.com/plugins/manywho/api/draw/1/authentication",
                    "username": res.username,
                    "password": res.password
                },
                headers: {
                    'ManyWhoTenant': 'da497693-4d02-45db-bc08-8ea16d2ccbdf'
                },
                json: true
            })
                .then(function (authenticationToken) {

                    console.log("Successfully authenticated");

                    // Grab the tenant identifier from the response token
                    var token = decodeURIComponent(authenticationToken);
                    var tokens = token.split('&');
                    var tenantId = null;

                    // Find the tenant token
                    for (var i = 0; i < tokens.length; i++) {

                        if (tokens[i].indexOf('ManyWhoTenantId') >= 0) {

                            tenantId = tokens[i].split('=')[1];
                            break;

                        }

                    }

                    // Get Flows for the matching name
                    requestPromise({
                        method: "GET",
                        uri: "https://flow.manywho.com/api/run/1/flow?filter=substringof(developername, '" + res.flow + "')",
                        headers: {
                            'ManyWhoTenant': tenantId
                        },
                        json: true
                    })
                        .then(function (flows) {

                            console.log("Successfully queried Flows");

                            if (flows != null &&
                                flows.length > 0) {

                                if (flows.length > 1) {
                                    console.log('More than Flow found for the provided name.');
                                    return;
                                }

                            } else {
                                console.log('No Flows found with that name.');
                                return;
                            }

                            // Get the snapshot for this name
                            requestPromise({
                                method: "GET",
                                uri: "https://flow.manywho.com/api/draw/1/flow/snap/" + flows[0].id.id + "/" + flows[0].id.versionId,
                                headers: {
                                    'Authorization': authenticationToken,
                                    'ManyWhoTenant': tenantId
                                },
                                json: true
                            })
                                .then(function (snapshot) {

                                    var path = '';

                                    if (res.phonegap == 'y') {
                                        console.log("Generating PhoneGap index.html");

                                        path = '../../';

                                        // Create a new index.html file with the appropriate settings
                                        gulp.src(["default-offline.html"])
                                            .pipe(replace("{{tenantId}}", tenantId))
                                            .pipe(replace("{{flowId}}", flows[0].id.id))
                                            .pipe(replace("{{directory}}", 'manywho/runtime/'))
                                            .pipe(replace("{{storage}}", 'db'))
                                            .pipe(replace("{{phonegap}}", '<script type="text/javascript" src="cordova.js"></script>'))
                                            .pipe(replace("{{build}}", res.build))
                                            .pipe(rename("index.html"))
                                            .pipe(gulp.dest(path));

                                        console.log("Generating PhoneGap tools.html");

                                        // Create a new tools.html file with the appropriate settings
                                        gulp.src(["default-tools.html"])
                                            .pipe(replace("{{tenantId}}", tenantId))
                                            .pipe(replace("{{flowId}}", flows[0].id.id))
                                            .pipe(replace("{{directory}}", 'manywho/runtime/'))
                                            .pipe(replace("{{storage}}", 'local'))
                                            .pipe(replace("{{build}}", res.build))
                                            .pipe(rename("tools.html"))
                                            .pipe(gulp.dest(path));
                                    } else {
                                        console.log("Generating offline.html");

                                        // Create a new offline.html file with the appropriate settings
                                        gulp.src(["default-offline.html"])
                                            .pipe(replace("{{tenantId}}", tenantId))
                                            .pipe(replace("{{flowId}}", flows[0].id.id))
                                            .pipe(replace("{{directory}}", ''))
                                            .pipe(replace("{{storage}}", 'local'))
                                            .pipe(replace("{{phonegap}}", ''))
                                            .pipe(replace("{{build}}", res.build))
                                            .pipe(rename("offline.html"))
                                            .pipe(gulp.dest('.'));

                                        console.log("Generating tools.html");

                                        // Create a new tools.html file with the appropriate settings
                                        gulp.src(["default-tools.html"])
                                            .pipe(replace("{{tenantId}}", tenantId))
                                            .pipe(replace("{{flowId}}", flows[0].id.id))
                                            .pipe(replace("{{directory}}", ''))
                                            .pipe(replace("{{storage}}", 'local'))
                                            .pipe(replace("{{build}}", res.build))
                                            .pipe(rename("tools.html"))
                                            .pipe(gulp.dest('.'));
                                    }

                                    // Write the snapshot file
                                    console.log("Generating js/config/snapshot-" + res.build + ".js");
                                    fs.writeFileSync(path + "js/config/snapshot-" + res.build + ".js", "offline.snapshot = " + JSON.stringify(snapshot, null, 4) + ";");


                                    // Write the responses file
                                    console.log("Generating js/config/responses-" + res.build + ".js");
                                    fs.writeFileSync(path + "js/config/responses-" + res.build + ".js", "offline.responses = null;");


                                    // Write the sequences file
                                    console.log("Generating js/config/sequences-" + res.build + ".js");
                                    fs.writeFileSync(path + "js/config/sequences-" + res.build + ".js", "offline.sequences = [];");


                                    var dataSync = {
                                        objectDataRequests: [],
                                        fileDataRequests: []
                                    };

                                    var uniqueDataSyncs = {};

                                    // Find object data requests in the pages
                                    if (snapshot.pageElements != null &&
                                        snapshot.pageElements.length > 0) {

                                        for (var i = 0; i < snapshot.pageElements.length; i++) {

                                            var pageComponents = snapshot.pageElements[i].pageComponents;

                                            if (pageComponents != null &&
                                                pageComponents.length > 0) {

                                                for (var j = 0; j < pageComponents.length; j++) {

                                                    var objectDataRequest = createRuntimeObjectDataRequest(snapshot, pageComponents[j].objectDataRequest, true);

                                                    if (objectDataRequest != null) {
                                                        // Add it to the list of requests to sync
                                                        uniqueDataSyncs[objectDataRequest.typeElementBindingId] = objectDataRequest;

                                                    }

                                                }

                                            }

                                        }

                                    }

                                    // Find the object data requests in the map elements
                                    if (snapshot.mapElements != null &&
                                        snapshot.mapElements.length > 0) {

                                        for (var i = 0; i < snapshot.mapElements.length; i++) {

                                            if (snapshot.mapElements[i].dataActions != null &&
                                                snapshot.mapElements[i].dataActions.length > 0) {

                                                for (var j = 0; j < snapshot.mapElements[i].dataActions.length; j++) {

                                                    // Only sync data load data actions
                                                    if (snapshot.mapElements[i].dataActions[j].crudOperationType.toLowerCase() == "load") {

                                                        var objectDataRequest = createRuntimeObjectDataRequest(snapshot, snapshot.mapElements[i].dataActions[j].objectDataRequest, true);

                                                        if (objectDataRequest != null) {
                                                            // Add it to the list of requests to sync
                                                            uniqueDataSyncs[objectDataRequest.typeElementBindingId] = objectDataRequest;
                                                        }

                                                    }

                                                }

                                            }

                                        }

                                    }

                                    // Go through all of the unique data syncs and add to the standard format
                                    for (var property in uniqueDataSyncs) {

                                        if (uniqueDataSyncs.hasOwnProperty(property)) {

                                            dataSync.objectDataRequests.push(uniqueDataSyncs[property]);

                                        }

                                    }

                                    // Write the data sync file
                                    console.log("Generating js/config/data-sync-" + res.build + ".js");
                                    fs.writeFileSync(path + "js/config/data-sync-" + res.build + ".js", "offline.dataSync = " + JSON.stringify(dataSync, null, 4) + ";");

                                    console.log("Done!");

                                    var files = [
                                        '*.html',
                                        'css/**/*.css',
                                        'img/**/*.png',
                                        'js/**/*.js'
                                    ];

                                    return browserSync.init(files, {
                                        server: {
                                            baseDir: '.',
                                            index: 'tools.html',
                                            middleware: function (req, res, next) {
                                                res.setHeader('Access-Control-Allow-Origin', '*');
                                                next();
                                            }
                                        },
                                        ghostMode: false
                                    });

                                })
                                .catch(function (err) {
                                    console.log('SnapShot Error: ' + err);
                                });

                        })
                        .catch(function (err) {
                            console.log('Flow Query: ' + err);
                        });

                })
                .catch(function (err) {
                    console.log('Login Error: ' + err);
                });

        }));

});

function createRuntimeObjectDataRequest(snapshot, objectDataRequest, clearFilter) {

    if (objectDataRequest != null) {

        for (var k = 0; k < snapshot.typeElements.length; k++) {

            if (snapshot.typeElements[k].id == objectDataRequest.typeElementId) {

                objectDataRequest.name = "Sync " + snapshot.typeElements[k].developerName + "s";
                objectDataRequest.typeElementBindingId = snapshot.typeElements[k].bindings[0].id;

                // Create the additional properties based on the Type
                objectDataRequest.objectDataType = {};
                objectDataRequest.objectDataType.typeElementId = snapshot.typeElements[k].id;
                objectDataRequest.objectDataType.developerName = snapshot.typeElements[k].developerName;

                objectDataRequest.objectDataType.properties = [];

                for (var l = 0; l < snapshot.typeElements[k].properties.length; l++) {

                    objectDataRequest.objectDataType.properties.push({
                        "developerName": snapshot.typeElements[k].properties[l].developerName,
                        "list": null
                    });

                }

                break;

            }

        }

        // Assign default properties
        objectDataRequest.authorization = null;
        objectDataRequest.configurationValues = null;
        objectDataRequest.command = null;
        objectDataRequest.culture = {
            "id": null,
            "developerName": null,
            "developerSummary": null,
            "brand": null,
            "language": "EN",
            "country": "USA",
            "variant": null
        };

        if (objectDataRequest.listFilter == null ||
            clearFilter == true) {
            objectDataRequest.listFilter = {};
        }

        // Assign a default data batch size and chunk size
        objectDataRequest.listFilter.limit = 250;
        objectDataRequest.chunkSize = 10;

        // Assign the empty state
        objectDataRequest.stateId = "00000000-0000-0000-0000-000000000000";
        objectDataRequest.token = null;
    }

    return objectDataRequest;
}
