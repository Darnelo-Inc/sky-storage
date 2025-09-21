#!/bin/bash

git_directory="https://github.com/Darnelo-Inc/sky-storage"
npm_directory="/путь/к/вашему/каталогу/npm"

cd "$git_directory" || exit 1
git pull

cd "$npm_directory" || exit 1
npm install

cd -

exit 0
