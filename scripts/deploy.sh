npm run build

cd dist && git init
git config --global user.name "Travis CI"
git config --global user.email "ci@travis-ci.org"
git add -A && git commit -am "Update gh-pages [skip ci]"
git checkout -b gh-pages
git push --force --quiet "https://${GH_TOKEN}@${REPO}" gh-pages:gh-pages
