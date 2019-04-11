
# WebSocket

- [Описание](#описание)
- [Установление соединения](#установление-соединения)
- [Расширения и подпротоколы](#расширения-и-подпротоколы)
- [WSS](#wss)
- [Использование](#использование)
- [Django Channels](#django-channels)
- [Полезные ссылки](#полезные-ссылки)

## Описание

**WebSocket** — протокол связи поверх TCP-соединения, предназначенный для обмена сообщениями между браузером и веб-сервером в режиме реального времени.

В настоящее время в W3C осуществляется стандартизация API Web Sockets. Черновой вариант стандарта этого протокола утвержден IETF.

WebSocket разработан для воплощения в веб-браузерах и веб-серверах, но он может быть использован для любого клиентского или серверного приложения. Протокол WebSocket — это независимый протокол, основанный на протоколе TCP. Это означает, что при соединении браузер отправляет по HTTP специальные заголовки, спрашивая: «поддерживает ли сервер WebSocket?». Если сервер в ответных заголовках отвечает «да, поддерживаю», то дальше HTTP прекращается и общение идет на специальном протоколе WebSocket, который уже не имеет с HTTP ничего общего.

WebSocket делает возможным более тесное взаимодействие между браузером и веб-сайтом, способствуя распространению интерактивного содержимого и созданию приложений реального времени.



## Установление соединения

Пример запроса от браузера при создании нового объекта WebSocket:

```
GET /chat HTTP/1.1
Host: server.example.com
Upgrade: websocket
Connection: Upgrade
Origin: http://javascript.ru
Sec-WebSocket-Key: Iv8io/9s+lYFgZWcXczP8Q==
Sec-WebSocket-Version: 13
```

Описание заголовков:

- `GET`, `Host` — стандартные HTTP-заголовки из URL запроса
- `Upgrade`, `Connection` — указывают, что браузер хочет перейти на websocket
- `Origin` — протокол, домен и порт, откуда отправлен запрос
- `Sec-WebSocket-Key` — Случайный ключ, который генерируется браузером: 16 байт в кодировке Base64
- `Sec-WebSocket-Version` — версия протокола. Текущая версия: 13

Все заголовки, кроме `GET` и `Host`, браузер генерирует сам, без возможности вмешательства JavaScript.

Ответ сервера, если он понимает и разрешает `WebSocket`-подключение с данного домена `Origin`:

```
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: hsBlbuDTkk24srzEOTBUlZAlC2g=
```

Здесь строка `Sec-WebSocket-Accept` представляет собой перекодированный по специальному алгоритму ключ `Sec-WebSocket-Key`. Браузер использует ее для проверки, что ответ предназначается именно ему.

## Расширения и подпротоколы

Также возможны дополнительные заголовки `Sec-WebSocket-Extensions` и `Sec-WebSocket-Protocol`, описывающие расширения и подпротоколы (subprotocol), которые поддерживает данный клиент.

- Заголовок `Sec-WebSocket-Extensions: deflate-frame` означает, что браузер поддерживает модификацию протокола, обеспечивающую сжатие данных. Это говорит не о самих данных, а об улучшении способа их передачи. Браузер сам формирует этот заголовок
- Заголовок `Sec-WebSocket-Protocol: soap, wamp` говорит о том, что по WebSocket браузер собирается передавать не просто какие-то данные, а данные в протоколах SOAP или WAMP («The WebSocket Application Messaging Protocol»). Стандартные подпротоколы регистрируются в специальном каталоге IANA. Этот заголовок браузер поставит, если указать второй необязательный параметр `WebSocket`.

При наличии таких заголовков сервер может выбрать расширения и подпротоколы, которые он поддерживает, и ответить с ними.

Например, запрос:

```
GET /chat HTTP/1.1
Host: server.example.com
Upgrade: websocket
Connection: Upgrade
Origin: http://javascript.ru
Sec-WebSocket-Key: Iv8io/9s+lYFgZWcXczP8Q==
Sec-WebSocket-Version: 13
Sec-WebSocket-Extensions: deflate-frame
Sec-WebSocket-Protocol: soap, wamp
```

Ответ:

```
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: hsBlbuDTkk24srzEOTBUlZAlC2g=
Sec-WebSocket-Extensions: deflate-frame
Sec-WebSocket-Protocol: soap
```

В ответе выше сервер указывает, что поддерживает расширение `deflate-frame`, а из запрошенных подпротоколов – только SOAP.

## WSS

Соединение `WebSocket` можно открывать как `WS://` или как `WSS://`. Протокол `WSS` представляет собой WebSocket над HTTPS.

**Кроме большей безопасности, у `WSS` есть важное преимущество перед обычным `WS` – большая вероятность соединения.** Дело в том, что HTTPS шифрует трафик от клиента к серверу, а HTTP – нет.

Если между клиентом и сервером есть прокси, то в случае с HTTP все WebSocket-заголовки и данные передаются через него. Прокси имеет к ним доступ, ведь они никак не шифруются, и может расценить происходящее как нарушение протокола HTTP, обрезать заголовки или оборвать передачу.

А в случае с `WSS` весь трафик сразу кодируется и через прокси проходит уже в закодированном виде. Поэтому заголовки гарантированно пройдут, и общая вероятность соединения через `WSS` выше, чем через `WS`.



## Использование

Для открытия соединения достаточно создать объект `WebSocket`, указав в нем специальный протокол `ws`.

```javascript
var socket = new WebSocket("ws://javascript.ru/ws");
```

У объекта `socket` есть четыре коллбэка: один при получении данных и три – при изменениях в состоянии соединения:

```javascript
socket.onopen = function() {
	alert("Соединение установлено.");
};

socket.onclose = function(event) {
	if (event.wasClean) {
		alert('Соединение закрыто чисто');
	} else {
		alert('Обрыв соединения'); // например, "убит" процесс сервера
	}
	alert('Код: ' + event.code + ' причина: ' + event.reason);
};

socket.onmessage = function(event) {
	alert("Получены данные " + event.data);
};

socket.onerror = function(error) {
	alert("Ошибка " + error.message);
};
```

**Для посылки данных используется метод `socket.send(data)`. Пересылать можно любые данные.** Например, строку:

```javascript
socket.send("Привет");
```

…Или файл, выбранный в форме:

```javascript
socket.send(form.elements[0].file);
```

**Для того, чтобы коммуникация была успешной, сервер должен поддерживать протокол WebSocket.**



## Django Channels

**Django Channels** привносит в привычную модель работы Django новый концепт, а именно ориентированность на события. Вместо оригинальной модели по типу запрос-ответ, фреймворк реагирует на ряд событий, попадающих в тот или иной канал, который "просматривается/прослушивается" обработчиками событий. Раньше для того, чтобы изменить любой HTTP запрос "на лету", необходимо было вмешиваться в цепочку Django Middleware, сейчас же HTTP запрос от браузера это событие, попадающее в канал `http.request`. Достаточно "повесить" на него прослушку, тем самым изменив его поведение должным образом.

Изнутри Channels это классическая очередь задач (вроде Celery), использующая Redis в качестве прослойки для коммуникации между теми кто создает события (producers) и теми, кто их выполняет (workers).

Ввиду того, что фреймворк работает в синхронном стиле, задача по его переписыванию на асинхронный лад является практически невозможной. В связи с этим, дабы упростить процесс написания кода (к слову, код пишется все в том же привычном синхронном стиле), а также обработку long-polling соединений, появилась необходимость разделить привычный механизм запрос-ответ на 3 уровня.

- **Уровень интерфейса** — это обработчики привычных нам протоколов взаимодействия между приложением и сервером, например WSGI, WebSocket
- **Уровень канала** — проще говоря, брокер. В качестве данного уровня могут выступать Redis, SQL база данных или область памяти
- **Уровень обработчиков** — процессы, следящие за поступлением сообщений в канал (очередь) и реагирующие на них тем или иным образом (обычно вызовом соответствующих функций-обработчиков)

Установка пакетов:

```bash
pip install channels
pip install channel-redis
 
# Хак по установке Twisted для Windows
# https://www.lfd.uci.edu/~gohlke/pythonlibs/#twisted
pip install Twisted-18.4.0-cp36-cp36m-win32.whl
pip install pypiwin32
```

Конфигурация Django `main/settings.py`:

```python
REDIS_URL = 'redis://localhost:6379'
CHANNEL_LAYERS = {
   'default': {
       'BACKEND': 'channels_redis.core.RedisChannelLayer',
       'CONFIG': {
           'hosts': [REDIS_URL],
       },
   },
}
ASGI_APPLICATION = 'main.routing.application'
```

Роутер `main/routing.py`:

```python
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from django.urls import path

from app.consumers import NotificationConsumer

application = ProtocolTypeRouter({
    'websocket': AuthMiddlewareStack(
        URLRouter([
            path('app/notification/', NotificationConsumer),
        ])
    ),
})
```

Обработчики `app/consumers.py`:

```python
import json

from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer

from project.models import Project

class OptimizerNotificationConsumer(WebsocketConsumer):
    def connect(self):
        async_to_sync(self.channel_layer.group_add)(
            'notification-{}'.format(self.scope['user'].id),
            self.channel_name)
        self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            'notification-{}'.format(self.scope['user'].id),
            self.channel_name)

    def task_notification(self, event):
        self.send(text_data=event['model'])
```

Отправка сообщения:

```python
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer

def send_message(user, data):
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)('notification-{}'.format(user.id), {
        'type': 'task.notification',
        'data': data,
    })
```



## Полезные ссылки

- [Оригинал статьи](https://learn.javascript.ru/websockets)
- [Документация Django Channels](https://channels.readthedocs.io/en/latest/)
- [Django Channels: работа с WebSocket и не только](https://khashtamov.com/ru/django-channels-websocket/)