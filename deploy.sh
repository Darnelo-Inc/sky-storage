#!/bin/bash

# Укажите путь к вашим каталогам Git и npm
git_directory="https://github.com/Darnelo-Inc/sky-storage"
npm_directory="/путь/к/вашему/каталогу/npm"

# Переходим в каталог Git и делаем git pull
cd "$git_directory" || exit 1
git pull

# Переходим в каталог npm и выполняем npm install
cd "$npm_directory" || exit 1
npm install

# Возвращаемся в исходный каталог (по желанию)
cd -

# Скрипт завершается
exit 0
