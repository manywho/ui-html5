var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');
var del = require('del');
var argv = require('yargs').argv;
var fs = require('fs');
var glob = require("glob");
var requestPromise = require('request-promise');
var gulpPrompt = require('gulp-prompt');
var fs = require('fs');
var replace = require('gulp-replace');
var rename = require("gulp-rename");

function getTask(task) {
    return require('./gulp-tasks/' + task)(gulp, plugins, browserSync, argv);
}

// Dev

gulp.task('dev-less', getTask('dev/less'));
gulp.task('dev-js', getTask('dev/js'));
gulp.task('dev-ts', getTask('dev/ts'));
gulp.task('dev-bootstrap', getTask('dev/bootstrap'));
gulp.task('dev-bootstrap-themes', getTask('dev/bootstrap-themes'));

gulp.task('dev-fonts', function () {
    return gulp.src('css/fonts/*.*').pipe(gulp.dest('./build/css/fonts'));
});

gulp.task('dev-lib', function () {
    return gulp.src('css/lib/*.*').pipe(gulp.dest('./build/css/lib'));
});

gulp.task('dev-js-watch', ['dev-js'], browserSync.reload);
gulp.task('dev-ts-watch', ['dev-ts'], browserSync.reload);

gulp.task('refresh', ['dev-less', 'dev-js', 'dev-ts', 'dev-bootstrap', 'dev-bootstrap-themes', 'dev-fonts', 'dev-lib'], function () {

    browserSync.init({
        server: {
            baseDir: './',
            index: 'debug.html',
            middleware: function (req, res, next) {
                res.setHeader('Access-Control-Allow-Origin', '*');
                next();
            }
        },
        ghostMode: false
    });

    gulp.watch('css/*.less', ['dev-less', 'dev-bootstrap']);
    gulp.watch('css/themes/*.less', ['dev-bootstrap-themes'])
    gulp.watch('js/**/*.js', ['dev-js-watch']);
    gulp.watch(['js/**/*.ts', 'js/**/*.tsx'], ['dev-ts-watch']);
    gulp.watch('debug.html').on('change', browserSync.reload);

});

// Dist

gulp.task('dist-less', getTask('dist/less'));
gulp.task('dist-bootstrap', getTask('dist/bootstrap'));
gulp.task('dist-bootstrap-themes', getTask('dist/bootstrap-themes'));
gulp.task('dist-js', getTask('dist/js'));
gulp.task('dist-loader', getTask('dist/loader'));

gulp.task('dist-clean', function (cb) {
    del(['dist'], cb);
});

gulp.task('dist-fonts', function () {
    return gulp.src('css/fonts/*.*').pipe(gulp.dest('./dist/css/fonts'));
});

gulp.task('dist-vendor', function () {
    return gulp.src(['js/vendor/*.js', 'js/vendor/vendor.json']).pipe(gulp.dest('./dist/js/vendor'));
});

gulp.task('dist-html', function () {
    return gulp.src('default.html').pipe(gulp.dest('./dist/'));
});

gulp.task('dist-hashes', function() {
    
    var css = glob.sync('dist/css/compiled-*.css')[0];
    var js = glob.sync('dist/js/compiled-*.js')[0];
    var bootstrap = glob.sync('dist/css/mw-bootstrap-*.css')[0];
        
    fs.writeFileSync('dist/hashes.json', JSON.stringify({
        css: css.replace('dist', ''),
        js: js.replace('dist', ''),
        bootstrap: bootstrap.replace('dist', '')
    }), 'utf8');
    
});

gulp.task('dist', function () {
    runSequence('dist-clean',              
                ['dist-js', 'dist-less', 'dist-bootstrap', 'dist-loader', 'dist-bootstrap-themes', 'dist-fonts', 'dist-vendor'],
                'dist-html');
});

// Deploy

gulp.task('deploy-cdn', getTask('deploy/cdn'));
gulp.task('deploy-short-cache', getTask('deploy/short-cache'));
gulp.task('deploy-no-cache', getTask('deploy/no-cache'));
gulp.task('invalidate', getTask('deploy/invalidate'));
gulp.task('deploy-player', getTask('deploy/player'));

gulp.task('offline', function() {

    // Print our logo for a bit of fun
    console.log("                                                                   @@@@");
    console.log("                                                                   @@@@");
    console.log("  @@@@   @@@@       @@@@@       @@@@    @@@@  @@@@ @@@@ @@@@@ @@@@ @@@@@@@@@     @@@@@@");
    console.log("@@@@@@@@@@@@@@@  @@@@@@@@@@   @@@@@@@@  @@@@  @@@@ @@@@ @@@@@ @@@@ @@@@@@@@@@  @@@@@@@@@@");
    console.log("@@@@ @@@@@ @@@@ @@@@    @@@@ @@@@@@@@@@ @@@@  @@@@ @@@@ @@@@@ @@@@ @@@@  @@@@ @@@@    @@@@");
    console.log("@@@@ @@@@@ @@@@ @@@@    @@@@ @@@@  @@@@ @@@@  @@@@ @@@@ @@@@@ @@@@ @@@@  @@@@ @@@@    @@@@");
    console.log("@@@@ @@@@@ @@@@ @@@@@@@ @@@@ @@@@  @@@@ @@@@@@@@@@ @@@@@@@@@@@@@@@ @@@@  @@@@  @@@@@@@@@@");
    console.log("@@@@ @@@@@ @@@@   @@@@@ @@@@ @@@@  @@@@  @@@@@@@@@  @@@@@@ @@@@@@  @@@@  @@@@    @@@@@@");
    console.log("                                             @@@@@");
    console.log("                                           @@@@@@@");
    console.log("                                           @@@@@");

    runSequence('offline-build-sequence', ['dev-less', 'dev-js', 'dev-ts', 'dev-bootstrap', 'dev-bootstrap-themes', 'dev-fonts', 'dev-lib']);

});

gulp.task('offline-build', function() {

    // Print our logo for a bit of fun
    console.log("                                                                   @@@@");
    console.log("                                                                   @@@@");
    console.log("  @@@@   @@@@       @@@@@       @@@@    @@@@  @@@@ @@@@ @@@@@ @@@@ @@@@@@@@@     @@@@@@");
    console.log("@@@@@@@@@@@@@@@  @@@@@@@@@@   @@@@@@@@  @@@@  @@@@ @@@@ @@@@@ @@@@ @@@@@@@@@@  @@@@@@@@@@");
    console.log("@@@@ @@@@@ @@@@ @@@@    @@@@ @@@@@@@@@@ @@@@  @@@@ @@@@ @@@@@ @@@@ @@@@  @@@@ @@@@    @@@@");
    console.log("@@@@ @@@@@ @@@@ @@@@    @@@@ @@@@  @@@@ @@@@  @@@@ @@@@ @@@@@ @@@@ @@@@  @@@@ @@@@    @@@@");
    console.log("@@@@ @@@@@ @@@@ @@@@@@@ @@@@ @@@@  @@@@ @@@@@@@@@@ @@@@@@@@@@@@@@@ @@@@  @@@@  @@@@@@@@@@");
    console.log("@@@@ @@@@@ @@@@   @@@@@ @@@@ @@@@  @@@@  @@@@@@@@@  @@@@@@ @@@@@@  @@@@  @@@@    @@@@@@");
    console.log("                                             @@@@@");
    console.log("                                           @@@@@@@");
    console.log("                                           @@@@@");

    runSequence('offline-build-sequence', ['dev-less', 'dev-js', 'dev-ts', 'dev-bootstrap', 'dev-bootstrap-themes', 'dev-fonts', 'dev-lib']);

});

gulp.task('offline-run', function() {

    // Print our logo for a bit of fun
    console.log("                                                                   @@@@");
    console.log("                                                                   @@@@");
    console.log("  @@@@   @@@@       @@@@@       @@@@    @@@@  @@@@ @@@@ @@@@@ @@@@ @@@@@@@@@     @@@@@@");
    console.log("@@@@@@@@@@@@@@@  @@@@@@@@@@   @@@@@@@@  @@@@  @@@@ @@@@ @@@@@ @@@@ @@@@@@@@@@  @@@@@@@@@@");
    console.log("@@@@ @@@@@ @@@@ @@@@    @@@@ @@@@@@@@@@ @@@@  @@@@ @@@@ @@@@@ @@@@ @@@@  @@@@ @@@@    @@@@");
    console.log("@@@@ @@@@@ @@@@ @@@@    @@@@ @@@@  @@@@ @@@@  @@@@ @@@@ @@@@@ @@@@ @@@@  @@@@ @@@@    @@@@");
    console.log("@@@@ @@@@@ @@@@ @@@@@@@ @@@@ @@@@  @@@@ @@@@@@@@@@ @@@@@@@@@@@@@@@ @@@@  @@@@  @@@@@@@@@@");
    console.log("@@@@ @@@@@ @@@@   @@@@@ @@@@ @@@@  @@@@  @@@@@@@@@  @@@@@@ @@@@@@  @@@@  @@@@    @@@@@@");
    console.log("                                             @@@@@");
    console.log("                                           @@@@@@@");
    console.log("                                           @@@@@");

    runSequence('offline-run-sequence', ['dev-less', 'dev-js', 'dev-ts', 'dev-bootstrap', 'dev-bootstrap-themes', 'dev-fonts', 'dev-lib']);

});

gulp.task('offline-build-sequence', function() {

    gulp.src('js/services/offline.js')
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
                message: 'Is this a Cordova build? (y/n)'
            },
            {
                type: 'input',
                name: 'debugging',
                message: 'Is this a debug build? (y/n)'
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
                                        console.log("Generating Cordova index.html");

                                        path = '../';
                                        var initializeCall = "";
                                        var enableDebugTools = false;
                                        var sourceFile = "default-offline.html";

                                        // Make sure the settings are correct depending on the debug configuration
                                        if (res.debugging == 'y') {
                                            sourceFile = "default-tools.html";
                                            enableDebugTools = true;
                                        }

                                        // Read in any extensions
                                        var extensions = getExtensions(path, res.build);

                                        // We also need to switch over to the database implementation for initialize
                                        initializeCall += "document.addEventListener('deviceready', function () {\r\r";
                                        initializeCall += getExtraIndent(12) + "    try {\r";
                                        initializeCall += getExtraIndent(12) + "        manywho.storage.setDatabase(window.sqlitePlugin.openDatabase(\r";
                                        initializeCall += getExtraIndent(12) + "            {\r";
                                        initializeCall += getExtraIndent(12) + "                name: 'manywho',\r";
                                        initializeCall += getExtraIndent(12) + "                location: 'default'\r";
                                        initializeCall += getExtraIndent(12) + "            },\r";
                                        initializeCall += getExtraIndent(12) + "            function () {\r";
                                        initializeCall += getExtraIndent(12) + "                " + getInitializeFunctionCall(16, enableDebugTools);
                                        initializeCall += getExtraIndent(12) + "            },\r";
                                        initializeCall += getExtraIndent(12) + "            function (error) {\r";
                                        initializeCall += getExtraIndent(12) + "                alert(error.message);\r";
                                        initializeCall += getExtraIndent(12) + "            }\r";
                                        initializeCall += getExtraIndent(12) + "        ));\r";
                                        initializeCall += getExtraIndent(12) + "    } catch (error) {\r";
                                        initializeCall += getExtraIndent(12) + "        alert(error.message);\r";
                                        initializeCall += getExtraIndent(12) + "    }\r";
                                        initializeCall += getExtraIndent(12) + "}, false);\r";

                                        // Create a new index.html file with the appropriate settings
                                        gulp.src([sourceFile])
                                            .pipe(replace("{{tenantId}}", tenantId))
                                            .pipe(replace("{{flowId}}", flows[0].id.id))
                                            .pipe(replace("{{flowVersionId}}", flows[0].id.versionId))
                                            .pipe(replace("{{directory}}", 'manywho/'))
                                            .pipe(replace("{{overrides}}", "<script src=\"js/manywho/authorization.js\"></script>\r<script src=\"js/manywho/log.js\"></script>"))
                                            .pipe(replace("{{extensions}}", extensions))
                                            .pipe(replace("{{storage}}", 'db'))
                                            .pipe(replace("{{cordova}}", '<script type="text/javascript" src="cordova.js"></script>'))
                                            .pipe(replace("{{isCordova}}", 'true'))
                                            .pipe(replace("{{build}}", res.build))
                                            .pipe(replace("{{playJoinUrl}}", "'index.html'"))
                                            .pipe(replace("{{initializeCall}}", initializeCall))
                                            .pipe(rename("index.html"))
                                            .pipe(gulp.dest(path));

                                        console.log("Generating Cordova tools.html");

                                        // Create a new tools.html file with the appropriate settings
                                        gulp.src(["default-tools.html"])
                                            .pipe(replace("{{tenantId}}", tenantId))
                                            .pipe(replace("{{flowId}}", flows[0].id.id))
                                            .pipe(replace("{{flowVersionId}}", flows[0].id.versionId))
                                            .pipe(replace("{{directory}}", 'manywho/'))
                                            .pipe(replace("{{overrides}}", ""))
                                            .pipe(replace("{{extensions}}", extensions))
                                            .pipe(replace("{{storage}}", 'local'))
                                            .pipe(replace("{{cordova}}", ''))
                                            .pipe(replace("{{isCordova}}", 'false'))
                                            .pipe(replace("{{playJoinUrl}}", "'http://localhost:3000/tools.html'"))
                                            .pipe(replace("{{build}}", res.build))
                                            .pipe(replace("{{initializeCall}}", getInitializeFunctionCall(0, true)))
                                            .pipe(rename("tools.html"))
                                            .pipe(gulp.dest(path));
                                    } else {
                                        console.log("Generating offline.html");

                                        // Read in any extensions
                                        var extensions = getExtensions(path, res.build);

                                        // Create a new offline.html file with the appropriate settings
                                        gulp.src(["default-offline.html"])
                                            .pipe(replace("{{tenantId}}", tenantId))
                                            .pipe(replace("{{flowId}}", flows[0].id.id))
                                            .pipe(replace("{{flowVersionId}}", flows[0].id.versionId))
                                            .pipe(replace("{{directory}}", ''))
                                            .pipe(replace("{{overrides}}", ""))
                                            .pipe(replace("{{extensions}}", extensions))
                                            .pipe(replace("{{storage}}", 'local'))
                                            .pipe(replace("{{cordova}}", ''))
                                            .pipe(replace("{{isCordova}}", 'false'))
                                            .pipe(replace("{{build}}", res.build))
                                            .pipe(replace("{{playJoinUrl}}", "backendUri + '/' + tenantId + '/play/default'"))
                                            .pipe(replace("{{initializeCall}}", getInitializeFunctionCall(0, false)))
                                            .pipe(rename("offline.html"))
                                            .pipe(gulp.dest('.'));

                                        console.log("Generating tools.html");

                                        // Create a new tools.html file with the appropriate settings
                                        gulp.src(["default-tools.html"])
                                            .pipe(replace("{{tenantId}}", tenantId))
                                            .pipe(replace("{{flowId}}", flows[0].id.id))
                                            .pipe(replace("{{flowVersionId}}", flows[0].id.versionId))
                                            .pipe(replace("{{directory}}", ''))
                                            .pipe(replace("{{overrides}}", ""))
                                            .pipe(replace("{{extensions}}", extensions))
                                            .pipe(replace("{{storage}}", 'local'))
                                            .pipe(replace("{{cordova}}", ''))
                                            .pipe(replace("{{isCordova}}", 'false'))
                                            .pipe(replace("{{build}}", res.build))
                                            .pipe(replace("{{playJoinUrl}}", "backendUri + '/' + tenantId + '/play/default'"))
                                            .pipe(replace("{{initializeCall}}", getInitializeFunctionCall(0, true)))
                                            .pipe(rename("tools.html"))
                                            .pipe(gulp.dest('.'));
                                    }

                                    // Write the snapshot file
                                    console.log("Generating js/config/snapshot-" + res.build + ".js");
                                    fs.writeFileSync(path + "js/config/snapshot-" + res.build + ".js", "offline.snapshot = " + JSON.stringify(snapshot, null, 4) + ";");

                                    if (res.debugging == 'y') {
                                        // Write the responses file
                                        console.log("Generating js/config/responses-" + res.build + ".js");
                                        fs.writeFileSync(path + "js/config/responses-" + res.build + ".js", "offline.responses = null;");
                                    } else {
                                        // Don't override default responses for a non-debug build
                                        console.log("Not generating js/config/responses-" + res.build + ".js");
                                    }

                                    if (overwriteDefaultResponses(path, res.build)) {
                                        // Write the default responses file
                                        console.log("Generating js/config/default-" + res.build + ".js");
                                        fs.writeFileSync(path + "js/config/default-" + res.build + ".js", "offline.defaultResponses = " + JSON.stringify(createDefaultUncachedResponses(snapshot), null, 4) + ";");
                                    } else {
                                        // Don't override default responses for a non-debug build
                                        console.log("Not generating js/config/default-" + res.build + ".js");
                                    }

                                    if (overwriteSequences(path, res.build)) {
                                        // Write the sequences file
                                        console.log("Generating empty js/config/sequences-" + res.build + ".js");
                                        fs.writeFileSync(path + "js/config/sequences-" + res.build + ".js", "offline.sequences = [];");
                                    } else {
                                        // Only generate the sequences file if it doesn't exist
                                        console.log("Not generating js/config/sequences-" + res.build + ".js");
                                    }

                                    var dataSync = {
                                        objectDataRequests: [],
                                        fileDataRequests: []
                                    };

                                    var dataSyncOverrides = getDataSyncOverrides(path, res.build);

                                    var uniqueDataSyncs = {};

                                    // Find object data requests in the pages
                                    if (snapshot.pageElements != null &&
                                        snapshot.pageElements.length > 0) {

                                        for (var i = 0; i < snapshot.pageElements.length; i++) {

                                            var pageComponents = snapshot.pageElements[i].pageComponents;

                                            if (pageComponents != null &&
                                                pageComponents.length > 0) {

                                                for (var j = 0; j < pageComponents.length; j++) {

                                                    var objectDataRequest = createRuntimeObjectDataRequest(snapshot, pageComponents[j].objectDataRequest, dataSyncOverrides, true);

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

                                                        var objectDataRequest = createRuntimeObjectDataRequest(snapshot, snapshot.mapElements[i].dataActions[j].objectDataRequest, dataSyncOverrides, true);

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

                                    var baseDirectory = '.';

                                    if (path != null &&
                                        path.length > 0) {
                                        baseDirectory = path;
                                    }

                                    return browserSync.init(files, {
                                        server: {
                                            baseDir: baseDirectory,
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

gulp.task('offline-run-sequence', function() {

    gulp.src('js/config/snapshot.js')
        .pipe(gulpPrompt.prompt([{
            type: 'input',
            name: 'phonegap',
            message: 'Was this a Cordova build? (y/n)'
        },
            {
                type: 'input',
                name: 'debugging',
                message: 'Was this a debug build? (y/n)'
            }], function(res) {

            var path = '';

            if (res.phonegap == 'y') {
                path = '../../';
            }

            var files = [
                '*.html',
                'css/**/*.css',
                'img/**/*.png',
                'js/**/*.js'
            ];

            var baseDirectory = '.';

            if (path != null &&
                path.length > 0) {
                baseDirectory = path;
            }

            return browserSync.init(files, {
                server: {
                    baseDir: baseDirectory,
                    index: 'tools.html',
                    middleware: function (req, res, next) {
                        res.setHeader('Access-Control-Allow-Origin', '*');
                        next();
                    }
                },
                ghostMode: false
            });

        }));

});

function createDefaultUncachedResponses(snapshot) {
    var defaultResponses = {};
    var navigationElementId = null;
    var navigationElementDeveloperName = null;
    var defaultCulture =  {
        "id": null,
        "developerName": null,
        "developerSummary": null,
        "brand": null,
        "language": "EN",
        "country": "USA",
        "variant": null
    };

    if (snapshot.navigationElements != null &&
        snapshot.navigationElements.length > 0) {

        if (snapshot.navigationElements.length > 1) {
            console.log("More than one Navigation Element has been found, generating navigation for: " + snapshot.navigationElements[0].developerName);
        }

        navigationElementId = snapshot.navigationElements[0].id;
        navigationElementDeveloperName = snapshot.navigationElements[0].developerName;

        defaultResponses.navigation = {};
        defaultResponses.navigation.developerName = snapshot.navigationElements[0].developerName;
        defaultResponses.navigation.label = snapshot.navigationElements[0].label;
        defaultResponses.navigation.navigationItemResponses = snapshot.navigationElements[0].navigationItems;
        defaultResponses.navigation.navigationItemDataResponses = createNavigationItemDataResponses(null, snapshot.navigationElements[0].navigationItems);
        defaultResponses.navigation.tags = null;
        defaultResponses.navigation.isVisible = true;
        defaultResponses.navigation.isEnabled = true;

    }

    // Create the default response for invoke
    defaultResponses.invoke = {
        "stateId": "00000000-0000-0000-0000-000000000000",
        "parentStateId": null,
        "stateToken": "00000000-0000-0000-0000-000000000000",
        "alertEmail": "steve.wood@manywho.com",
        "waitMessage": null,
        "notAuthorizedMessage": null,
        "currentMapElementId": "00000000-0000-0000-0000-000000000000",
        "currentStreamId": null,
        "invokeType": "FORWARD",
        "annotations": null,
        "mapElementInvokeResponses": [
            {
                "mapElementId": "00000000-0000-0000-0000-000000000000",
                "developerName": "Default",
                "pageResponse": {
                    "label": "",
                    "pageContainerResponses": [
                        {
                            "id": "00000000-0000-0000-0000-000000000000",
                            "containerType": "VERTICAL_FLOW",
                            "developerName": "root",
                            "label": "",
                            "pageContainerResponses": null,
                        }
                    ],
                    "pageComponentResponses": [
                        {
                            "pageContainerDeveloperName": "root",
                            "pageContainerId": "00000000-0000-0000-0000-000000000000",
                            "id": "00000000-0000-0000-0000-000000000000",
                            "developerName": "Message",
                            "componentType": "PRESENTATION",
                            "contentType": null,
                            "label": "",
                            "columns": null,
                            "size": 0,
                            "maxSize": 0,
                            "height": 0,
                            "width": 0,
                            "hintValue": "",
                            "helpInfo": "",
                            "order": 0,
                            "isMultiSelect": false,
                            "isSearchable": false,
                            "hasEvents": false,
                            "attributes": null
                        }
                    ],
                    "pageComponentDataResponses": [
                        {
                            "pageComponentId": "00000000-0000-0000-0000-000000000000",
                            "isEnabled": true,
                            "isEditable": false,
                            "isRequired": false,
                            "isVisible": true,
                            "objectData": null,
                            "objectDataRequest": null,
                            "fileDataRequest": null,
                            "contentValue": null,
                            "content": "<h3 style=\"text-align: left;\">This page is not currently available offline</h3>",
                            "imageUri": null,
                            "isValid": true,
                            "validationMessage": null,
                            "tags": null
                        }
                    ],
                    "pageContainerDataResponses": [
                        {
                            "pageContainerId": "00000000-0000-0000-0000-000000000000",
                            "isEnabled": true,
                            "isEditable": true,
                            "isVisible": true,
                            "tags": null
                        }
                    ],
                    "tags": null,
                    "attributes": null,
                    "order": 0
                },
                "outcomeResponses": null,
                "rootFaults": null
            }
        ],
        "voteResponse": null,
        "stateLog": null,
        "preCommitStateValues": null,
        "stateValues": null,
        "outputs": null,
        "statusCode": "200",
        "runFlowUri": "http://localhost:3000/tools.html?flow-id=00000000-0000-0000-0000-000000000000",
        "joinFlowUri": "http://localhost:3000/tools.html?join=00000000-0000-0000-0000-000000000000",
        "authorizationContext": {
            "directoryName": null,
            "directoryId": null,
            "loginUrl": null,
            "authenticationType": "USERNAME_PASSWORD"
        }
    };
    defaultResponses.invoke.culture = defaultCulture;

    if (navigationElementId != null &&
        navigationElementId.trim().length > 0) {

        defaultResponses.invoke.navigationElementReferences = [
            {
                "id": navigationElementId,
                "developerName": navigationElementDeveloperName
            }
        ];

    }

    // Create the default response for object data that has not been sync'd
    defaultResponses.objectData = {
        "objectData": null,
        "hasMoreResults": true,
        "typeElementId": "00000000-0000-0000-0000-000000000000",
        "tableName": null
    };
    defaultResponses.objectData.culture = defaultCulture;

    return defaultResponses;

}

function createNavigationItemDataResponses(navigationItemDataResponses, navigationItems) {

    if (navigationItemDataResponses == null) {
        navigationItemDataResponses = [];
    }

    if (navigationItems != null &&
        navigationItems.length > 0) {

        for (var i = 0; i < navigationItems.length; i++) {

            navigationItemDataResponses.push({
                "navigationItemId": navigationItems[i].id,
                "navigationItemDeveloperName": navigationItems[i].developerName,
                "isActive": false,
                "isCurrent": true,
                "isEnabled": true,
                "isVisible": true,
                "locationMapElementId": navigationItems[i].locationMapElementId,
                "tags": null
            });

            createNavigationItemDataResponses(navigationItemDataResponses, navigationItems[i].navigationItems);

        }

    }

    return navigationItemDataResponses;

}

function createRuntimeObjectDataRequest(snapshot, objectDataRequest, dataSyncOverrides, clearFilter) {

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

            // Assign a default data batch size
            objectDataRequest.listFilter.limit = 250;
            objectDataRequest.listFilter.chunkSize = 10;
        }

        if (dataSyncOverrides != null &&
            dataSyncOverrides.length > 0) {

            for (var i = 0; i < dataSyncOverrides.length; i++) {

                if (dataSyncOverrides[i].typeElementBindingId == objectDataRequest.typeElementBindingId) {

                    console.log("Applying data sync override for: " + objectDataRequest.name);

                    // If the binding matches, we override the generated filter with the override
                    objectDataRequest.listFilter = dataSyncOverrides[i].listFilter;
                    break;

                }

            }

        }

        // Assign the empty state
        objectDataRequest.stateId = "00000000-0000-0000-0000-000000000000";
        objectDataRequest.token = null;
    }

    return objectDataRequest;
}

function getInitializeFunctionCall(extraIndent, isDebug) {

    // This is the default initialize call for the index page
    var defaultInitializeCall = "";
    defaultInitializeCall += "manywho.engine.initialize(\r";
    defaultInitializeCall += getExtraIndent(extraIndent) + "                        tenantId,\r";
    defaultInitializeCall += getExtraIndent(extraIndent) + "                        flowId,\r";
    defaultInitializeCall += getExtraIndent(extraIndent) + "                        flowVersionId,\r";
    defaultInitializeCall += getExtraIndent(extraIndent) + "                        'main',\r";
    defaultInitializeCall += getExtraIndent(extraIndent) + "                        queryParameters['join'],\r";
    defaultInitializeCall += getExtraIndent(extraIndent) + "                        queryParameters['authorization'],\r";
    defaultInitializeCall += getExtraIndent(extraIndent) + "                        options,\r";
    defaultInitializeCall += getExtraIndent(extraIndent) + "                        queryParameters['initialization']\r";
    defaultInitializeCall += getExtraIndent(extraIndent) + "                    );\r";

    return defaultInitializeCall;

}

function getExtraIndent(extraIndent) {

    var indent = "";

    for (var i = 0; i < extraIndent; i++) {
        indent += " ";
    }

    return indent;

}

function overwriteSequences(path, build) {

    try {
        fs.readFileSync(path + "js/config/sequences-" + build + ".js", "utf8");
        return false;
    } catch (error) {
        return true;
    }

}

function overwriteDefaultResponses(path, build) {

    try {
        fs.readFileSync(path + "js/config/default-" + build + ".js", "utf8");
        return false;
    } catch (error) {
        return true;
    }

}

function getExtensions(path, build) {

    var extensionsReferences = "";

    try {
        // Read in any extensions
        var extensions = JSON.parse(fs.readFileSync(path + "js/config/extensions-" + build + ".json", "utf8"));

        if (extensions != null &&
            extensions.length > 0) {

            // Go through each of the extensions and add them to the build
            for (var i = 0; i < extensions.length; i++) {
                console.log("Applying extension: " + extensions[i]);
                extensionsReferences += '<script src="' + extensions[i] + '"></script>\r';
            }

        }
    } catch (error) {
        console.log("No extensions provided")
    }

    return extensionsReferences;

}

function getDataSyncOverrides(path, build) {

    try {
        // Read in any data sync filter customizations
        return JSON.parse(fs.readFileSync(path + "js/config/data-sync-overrides-" + build + ".json", "utf8"));
    } catch (error) {
        console.log("No data sync filter customizations provided")
    }

    return null;

}
