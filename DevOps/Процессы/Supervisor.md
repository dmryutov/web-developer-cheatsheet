# Supervisor

- [Описание](#описание)
- [Установка](#установка)
- [Использование](#использование)
- [Команды](#команды)
- [Дополнительные возможности](#дополнительные-возможности)
- [Полезные ссылки](#полезные-ссылки)

## Описание

**Supervisor** — система клиент/сервер, при помощи которой пользователь (администратор) может контролировать подключенные процессы в системах типа UNIX. Инструмент создает процессы в виде под-процессов от своего имени, поэтому имеет полный контроль над ними.

Supervisor состоит из:

- `supervisord` — сам север, обрабатывающий запросы от клиентов и считывающий файлы настроек для сервисов
- `supervisorctl` — CLI для управления процессами под контролем `supervisord`, подключаясь к нему через сокет или TCP порт
- HTTP сервер v предоставляет веб-интерфейс для доступа к `supervisord`


## Установка

```bash
# Через APT-GET
sudo apt-get update
sudo apt-get install supervisor
# Через PIP
sudo pip3 install supervisor
```


## Использование

После установки, supervisor нужно сконфигурировать и добавить программы/процессы, которыми он будет управлять. Файл конфигурации по умолчанию находится в `/etc/supervisor/supervisord.conf` (для Ubuntu, Debian) или `/etc/supervisord.conf` (для FreeBSD и т.д.).

Для добавления нового процесса (воркера) нужно дополнить файл следующим кодом:

```
; Название процесса/воркера, к которому будут относиться все последующие параметры секции
[program:myapp]
; Команда на запуск файла, то есть путь к нужному файлу
command=/usr/bin/php /var/www/worker.php
; Вывод консоли в файл
stdout_logfile=/var/log/worker.log
; Запуск воркера вместе с запуском supervisor;
autostart=true
; Перезапуск воркера, если тот по какой-то причине упал
autorestart=true
; Запуск процесса под определенным пользователем
user=www-data
; Сигнал остановки (убийства) процесса. Если не определяется, то используется команда по умолчанию — TERM
stopsignal=KILL
; Количество копий заданного воркера
numprocs=1
```

В случае, когда требуется запуск сразу нескольких копий одного и того же процесса, конфигурация будет иметь вид:

```
[program:myapp]
command=/usr/bin/php /var/www/worker.php
stdout_logfile=/var/log/worker.log
autostart=true
autorestart=true
user=www-data
stopsignal=KILL
; 10 копий процесса
numprocs=10
; Задает имена всех копий процесса — myapp_00, myapp_01, ...
process_name=%(program_name)s_%(process_num)02d
```


## Команды

```bash
# Обновить конфиг
sudo supervisorctl reread
# Перезапустить приложение, конфиг которого был обновлен
sudo supervisorctl update
# Статус приложения
sudo supervisorctl status myapp
# Перезапустить приложение
sudo supervisor restart myapp
```



## Дополнительные возможности

В supervisor есть встроенный механизм мониторинга событий, при помощи которого система может оповещать об ошибках:

```
[eventlistener:memmon]
command=memmon -a 200MB -m error@mydomain.ru
events=TICK_60
```

Supervisor также включает пользовательский веб-интерфейс `supervisorctl`, который включается при помощи файла конфигурации. Для этого нужно изменить секцию `[inet_http_server]`, вписав туда верные имя пользователя и пароль:

```bash
# Открыть файл конфигурации
sudo vi /etc/supervisor/supervisor.conf

# Обновить секцию [inet_http_server]
# [inet_http_server]
# port=9001
# username=admin
# password=IT7lCdCpTn

# Перезапустить supervisor
sudo /etc/init.d/supervisor restart
```

Теперь всеми доступными процессами можно управлять через браузер по адресу [http://127.0.0.1:9001](http://127.0.0.1:9001).



## Полезные ссылки

- [Оригинал статьи](https://ruhighload.com/%D0%97%D0%B0%D0%BF%D1%83%D1%81%D0%BA+%D0%BF%D1%80%D0%BE%D1%86%D0%B5%D1%81%D1%81%D0%BE%D0%B2+%D0%B2+supervisor)
- [Документация](http://supervisord.org/)