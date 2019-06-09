# Heroku

- [Описание](#описание)
- [Deploy](#deploy)
- [Полезные ссылки](#полезные-ссылки)

## Описание

**Heroku** — облачная PaaS-платформа, поддерживающая ряд языков программирования. С 2010 года является дочерней компанией Salesforce.com. Heroku, одна из первых облачных платформ, появилась в июне 2007 года и изначально поддерживала только язык программирования **Ruby**, но на данный момент список поддерживаемых языков также включает в себя **Java**, **Node.js**, **Scala**, **Clojure**, **Python**, **Go** и **PHP**. На серверах Heroku используются операционные системы Debian или Ubuntu.

Приложения, работающие на Heroku, используют также DNS-сервер Heroku (обычно приложения имеют доменное имя вида `имя_приложения.herokuapp.com`). Для каждого приложения выделяется несколько независимых виртуальных процессов, которые называются `dynos`. Они распределены по специальной виртуальной сетке (`dynos grid`), которая состоит из нескольких серверов. Heroku также имеет систему контроля версий Git.



## Deploy

```bash
# Инициализация репозитория
git init
git add .
git commit -m "Initial commit"

# Создание проекта Heroku
heroku login
heroku create [PROJECT_NAME]
# Изменить случайное имя приложения, которое Heroku дает при инициализации
heroku apps:rename hello
# Необходимо при первом `git push`
heroku keys:add
heroku addons:create heroku-postgresql

# Отправка на сервер и запуск
git push heroku master
heroku open
```



## Полезные ссылки

- [Документация](https://devcenter.heroku.com/categories/reference)
- [Развертывание Django на Heroku](https://github.com/kinoafisharu/import/wiki/%D0%A0%D0%B0%D0%B7%D0%B2%D1%91%D1%80%D1%82%D1%8B%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5-Django-%D0%BD%D0%B0-Heroku)