git checkout master

#!/usr/bin/env sh
set -e
echo "Enter release version: "
read VERSION

read -p "Releasing $VERSION - are you sure? (y/n)" -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
  echo "Releasing $VERSION ..."

  # build
  npm run components

  # commit build
  git add -A
  git commit -m "[build] $VERSION"

  # commit
  npm version $VERSION --message "[release] $VERSION"

  # publish
  echo "publishing git..."
  git push origin master
  git push origin refs/tags/v$VERSION

  echo "publishing npm..."
  npm publish
fi
