#!/usr/bin/env sh

set -e

npm run build

cd dist

git init
git add -A
git commit -m 'New Deploy to dist'
git push -f git@github.com:Isidorev215/anamen_test.git master:gh-pages

cd -