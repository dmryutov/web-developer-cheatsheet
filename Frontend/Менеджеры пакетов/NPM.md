# NPM

- [Описание](#описание)
- [Установка](#установка)
- [Использование](#использование)
- [NPM-скрипты](#npm-скрипты)
- [Разное](#разное)
- [Полезные ссылки](#полезные-ссылки)

## Описание

**NPM** (**N**ode **P**ackage **M**anager) — менеджер пакетов, который устанавливается вместе с платформой **Node.js**. NPM — причина того, почему Node.js так популярен. Этот пакетный менеджер представляет собой огромную экосистему платформы. Благодаря ему можно установить любой пакет, созданный другими разработчиками, для облегчения решения какой-нибудь задачи. Это отличный помощник при работе с платформой.



## Установка

```bash
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm config set unsafe-perm=true
```



## Использование

```bash
# Описание команды, варианты вызова, алиасы
npm [command] -h
# Установка пакета(ов)
npm install [package]
npm i [package]
# Установка пакета(ов) как dev-зависимость
npm install [package] --save-dev
npm i [package] -D
# Открыть домашнюю страницу пакета
npm home [package]
# Открыть страницу проекта в репозитории
npm repo [package]
# Удалить пакет
npm uninstall [package]
npm r [package]
# Показать список установленных в проекте пакетов
npm list --depth=0
# Показать список глобально установленных пакетов
npm list -g --depth=0
# Показать версию установленного пакета, -g для глобально установленного пакета
npm list [package]
# Показать последнюю доступную для установки версию пакета
npm view [package] version
# Сравнить версии установленных в проекте пакетов (новые в рамках прописанных версий и самые новые версии)
npm outdated
```



## NPM-скрипты

В `package.json`, в секцию `scripts` можно прописать команды, которые будут выполняться с помощью команды `npm run`, но по умолчанию есть некоторые сокращения:

- `npm test` или `npm t` — сокращения для `npm run test`
- `npm start` — сокращение для `npm run start`

Команда `npm run [что-то]` добавляет в `$PATH` директорию `node_modules/.bin`, так что можно использовать не глобально установленные зависимости проекта без упоминания этой директории. Например, можно писать:

```json
"scripts": {
  "test": "stylelint ./src/**/*.less",
  "start": "gulp"
},
```

вместо

```json
"scripts": {
  "test": "./node_modules/.bin/stylelint ./src/**/*.less",
  "start": "./node_modules/.bin/gulp"
},
```

Скрипты могут вызывать другие скрипты последовательно:

```json
"scripts": {
  "clean-build-directory": "...",
  "start": "...",
  "build": "npm run clean-build-directory && npm run start"
},
```

и параллельно:

```json
"scripts": {
  "coverage": "npm run tests-coverage & npm run types-coverage"
},
```



## Разное

Задайте свои данные по умолчанию, чтобы не вводить их при каждом `npm init`.

```bash
npm set init.author.name "$NAME"
npm set init.author.email "$EMAIL"
npm set init.author.url "$SITE"
```

Поместите в корень репозитория файл `.npmrc` из этого репозитория для уменьшения длинны сообщений об ошибках в консоли.

Отключите прогресс-бар для увеличения скорости установки пакетов: `npm set progress=false`

Используйте сокращенную запись для установки пакетов с одинаковым префиксом: <br>
`npm i gulp-{concat,minify,uglify} -D`

Используете [bower](https://bower.io/)? Хорошо. Но для тех, кто его не использует, будет невозможно собрать проект. Чтобы этого избежать, поставьте bower как зависимость и пропишите команду, выполняющуюся сразу после вызова `npm install`:

```bash
"scripts": {
  "postinstall": "bower install"
},
```



## Полезные ссылки

- [Оригинал статьи](https://github.com/nicothin/web-development/blob/master/npm/readme.md)
- [Документация](https://docs.npmjs.com/)
- [Почему npm-скрипты?](http://prgssr.ru/development/pochemu-npm-skripty.html#heading-browsersync)