#!/usr/bin/env sh
set -e
echo "Enter release version: "
read VERSION

read -p "Releasing $VERSION - are you sure? (y/n)" -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
  # build
  npm run build:lib
  if [[ `git status --porcelain` ]]; 
  then
    git add -A
    git commit -am "build: compile $VERSION"
  fi

  # commit
  npm version $VERSION --message "build: release $VERSION"

  # publish
  git push origin dev
  git push origin refs/tags/v$VERSION
  npm publish
fi
