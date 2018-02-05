npm run build

cd dist
git config --global user.name "Travis CI"
git config --global user.email "ci@travis-ci.org"

$(npm bin)/update-branch --commands "npm run build-travis" \
                         --commit-message "Update gh-pages [skip ci]" \
                         --directory "website/dist" \
                         --distribution-branch "gh-pages" \
                         --source-branch "master"