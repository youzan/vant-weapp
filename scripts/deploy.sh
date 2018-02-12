cd website && yarn && yarn cache node_modules

npm run build

cd dist && git init

NAME=`git config user.name`
EMAIL=`git config user.email`
git config --global user.name $NAME
git config --global user.email $EMAIL
git add -A && git commit -am "Update gh-pages [skip ci]"

