#!/bin/sh

set -e

BRANCH_NAME="${bamboo_planRepository_branchName}"

if [ "$BRANCH_NAME" = "" ]; then
  echo "No bamboo_planRepository_branchName environment variable is set" 1>&2
  exit 1
fi

if [ "$BRANCH_NAME" = "develop" ]; then
  # We're building the master branch, so we want to push the "latest" tag
  docker build -t quay.io/manywho/ui-runtime:latest .
  docker push quay.io/manywho/ui-runtime:latest
fi

# Replace the slashes in branch names with dashes, so we can use it as an image tag
IMAGE_TAG=`echo ${BRANCH_NAME} | sed -e "s/\//-/g"`
IMAGE="quay.io/manywho/ui-runtime:${IMAGE_TAG}"

# We always want to push the "branched" image tag too
docker build -t ${IMAGE} .
docker push ${IMAGE}
