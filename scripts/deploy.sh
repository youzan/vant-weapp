git config --global user.name "Travis CI"
git config --global user.email "ci@travis-ci.org"

$(npm bin)/update-branch --commands "npm run build" \
                         --commit-message "Update gh-pages [skip ci]" \
                         --directory "dist" \
                         --distribution-branch "gh-pages" \
                         --source-branch "master"