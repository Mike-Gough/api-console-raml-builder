#!/bin/bash
if [[ -z "$HTTP_PROXY_USERNAME" ]]; then
  echo "please ensure that you have set the environment variable \$HTTP_PROXY_USERNAME"
  exit 1
fi

if [[ -z "$HTTP_PROXY_PASSWORD" ]]; then
  echo "please ensure that you have set the environment variable \$HTTP_PROXY_PASSWORD"
  exit 1
fi

USERNAME="$HTTP_PROXY_USERNAME"
PASSWORD="$HTTP_PROXY_PASSWORD"
HERE=$(dirname .)
#OLD_PATH=$PATH
#export PATH="/tmp/api-console-raml-builder/binaries/node-v10.15.0-linux/bin:$OLD_PATH"

echo "installing npm dependancies"
npm config set registry https://cdc-aphmv-dev.comsuper.int:8443/artifactory/api/npm/virtual-npm/
npm install -d

#export PATH="$OLD_PATH"
