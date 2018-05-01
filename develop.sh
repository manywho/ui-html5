#!/usr/bin/env bash

cd ../ui-core
npm start -- --env.build=../ui-html5/build &
cd ../ui-bootstrap
npm start &
cd ../ui-html5
npm start