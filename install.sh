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

echo "setting npm config"
./binaries/node-v10.15.0-linux/bin/npm config set strict-ssl false
./binaries/node-v10.15.0-linux/bin/npm config set cache $HERE/npm-cache
./binaries/node-v10.15.0-linux/bin/npm config set proxy "http://$USERNAME:$PASSWORD@cswebproxy.comsuper.int:80/"
./binaries/node-v10.15.0-linux/bin/npm config set https-proxy "http://$USERNAME:$PASSWORD@cswebproxy.comsuper.int:80/"

echo "setting git local config"
git config url."https://".insteadOf git://
git config url."https://github.com/".insteadOf git@github.com/
git config http.sslVerify false
git config http.proxy "http://$USERNAME:$PASSWORD@cswebproxy.comsuper.int:80/"
git config https.proxy "http://$USERNAME:$PASSWORD@cswebproxy.comsuper.int:80/"

#echo "setting git global config"
#git config --global url."https://".insteadOf git://
#git config --global url."https://github.com/".insteadOf git@github.com/
#git config --global http.sslVerify false
#git config --global http.proxy "http://$USERNAME:$PASSWORD@cswebproxy.comsuper.int:80/"
#git config --global https.proxy "http://$USERNAME:$PASSWORD@cswebproxy.comsuper.int:80/"

echo "installing npm dependancies"
./binaries/node-v10.15.0-linux/bin/npm install
