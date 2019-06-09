# Jenkins

- [Описание](#описание)
- [Установка](#установка)
- [Полезные ссылки](#полезные-ссылки)

## Описание

**Jenkins** — программная система с открытым исходным кодом на Java, предназначенная для обеспечения процесса непрерывной интеграции программного обеспечения. Ответвлена в 2008 году от проекта Hudson, принадлежащего компании Oracle, основным его автором — Косукэ Кавагути. Распространяется под лицензией MIT.

Позволяет автоматизировать часть процесса разработки программного обеспечения, в котором не обязательно участие человека, обеспечивая функции непрерывной интеграции. Работает в сервлет-контейнере, например, **Apache Tomcat**. Поддерживает инструменты системы управления версиями, включая **AccuRev**, **CVS**, **Subversion**, **Git**, **Mercurial**, **Perforce**, **Clearcase** и **RTC**. Может собирать проекты с использованием **Apache Ant** и **Apache Maven**, а также выполнять произвольные сценарии оболочки и пакетные файлы Windows. Сборка может быть запущена разными способами, например, по событию фиксации изменений в системе управления версиями, по расписанию, по запросу на определённый URL, после завершения другой сборки в очереди.

Возможности Jenkins можно расширять с помощью плагинов.



## Установка

Установка как сервис:

```bash
# Установка
wget -q -O - https://pkg.jenkins.io/debian-stable/jenkins.io.key | sudo apt-key add -
sudo sh -c 'echo deb http://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'
sudo apt update
sudo apt install jenkins

# Сменить порт - добавить строку "HTTP_PORT=5960"
# Сменить корень сайта - добавить строку "JENKINS_ARGS="--webroot=/var/cache/$NAME/war --httpPort=$HTTP_PORT --prefix=$PREFIX""
vi /etc/default/jenkins

# Запуск
sudo service jenkins start
```

Установка с помощью Docker — файл `docker-compose.yml`:

```yml
version: '2'

volumes:
  - jenkins_data: {}

services:
  runner:
    image: jenkins
    ports:
      - 8080:8080
      - 50000:50000
    volumes:
      - jenkins_data:/var/jenkins_home
    restart: always
```



## Полезные ссылки

- [Документация](https://jenkins.io/doc/)
- [Настройка Jenkins для Django проекта с нуля](https://habr.com/ru/post/132521/)