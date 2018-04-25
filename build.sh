#!/usr/bin/env bash

cd ../ui-core
npm run dev -- --env.build=../ui-html5/build &
cd ../ui-bootstrap
npm run dev -- --env.build=../ui-html5/build --env.assets=local --env.sourcemaps &
cd ../ui-html5
npm start