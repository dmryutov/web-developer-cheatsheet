# Sentry

- [Описание](#описание)
- [Установка](#установка)
- [Интеграция](#интеграция)
- [Полезные ссылки](#полезные-ссылки)

## Описание

**Sentry** — система для оперативного мониторинга ошибок в различных приложениях.

Sentry имеет сервер для централизованного сбора проблем. Можно использовать облачные услуги разработчика или же развернуть собственный, поскольку проект OpenSource.

Для того, чтобы сервер получал сообщения об ошибках необходимо внедрить агента системы в разрабатываемое приложение. Для этого нужно использовать SDK, который специфичен для каждого языка программирования. Sentry может работать со следующими языками:

- **Python** (включая Django, Flask, Pyramid)
- **JavaScript** (включая React, Angular, Ember, Vue, Backbone)
- **Node.js** (включая Express, Koa, Connect)
- **PHP** (включая Laravel, Symfony, Monolog)
- **Ruby** (включая Rails, Sinatra, Rack)
- **Cocoa** (iOS, macOS, tvOS)
- **Java**
- **C#** (включая Mono и .NET)
- **Go**
- **Elixir**
- **Perl**
- **ActionScript**

Sentry использует соединение по протоколу TCP (HTTP/HTTPS). Это не очень здорово для журналирования, потому что этот протокол работает медленно из-за своей "гарантированной доставки". Для не слишком критичных приложений, таких, как журналирование, лучше подходит соединение по UDP. В данный момент последняя стабильная версия Sentry не поддерживает UDP. Однако для тех, кому важна производительность, версия с поддержкой UDP уже в работе.

Sentry имеет возможности двухфакторной аутентификации и SSO.

Интерфейс пользователя имеет вид Dashboard’а в котором отображен перечень полученных ошибок и имеются возможности выполнения действий над ними.

В Sentry присутствует ниже перечисленный функционал:

- Обновление списка ошибок в режиме реального времени
- Группировка и сортировка полученных ошибок, например по частоте появления
- Фильтрация ошибок по статусу, уровню логирования, источнику и другим параметрам
- Возможность реинкарнации ошибки. Если ошибка была помечена как решенная и появилась снова, то она снова вносится в список и учитывается в отдельном потоке
- Отправка e-mail, sms или чат-сообщений, в случае получения новой ошибки
- Возможность запроса Feedback’а пользователя
- Возможность интеграции с такими системами как JIRA, GitHub, Bitbucket и другими



## Установка

```bash
# Скачиваем репозиторий
sudo git clone https://github.com/getsentry/onpremise.git sentry
cd sentry
# Создаем файл с переменными окружения
sudo mv .env.example .env
# Генерируем секретный ключ, который сохраняем в .env файл
sudo docker-compose run --rm web config generate-secret-key
# Подготавливаем БД
sudo docker-compose run --rm web upgrade
# Запускаем сервис
sudo docker-compose up -d
```

Пример конфигурации — файл `config.yml`:

```yml
mail.backend: 'smtp'  # Use dummy if you want to disable email entirely
mail.host: 'your_host'
mail.port: 25
# mail.username: ''
# mail.password: ''
mail.use-tls: true
# The email address to send on behalf of
mail.from: 'sentry@your_host'

system.url-prefix: 'https://sentry.bi.omd.ru'
```

Файл `docker-compose.yml`:

```yml
version: '2'

volumes:
  sentry: {}
  postgres: {}

services:
  memcached:
    image: memcached:1.5-alpine
    restart: always

  redis:
    image: redis:5-alpine
    restart: always

  postgres:
    image: postgres:10-alpine
    volumes:
      - postgres:/var/lib/postgresql/data
    restart: always

  smtp:
    image: tianon/exim4
    restart: always

  sentry:
    image: sentry:9.1-onbuild
    ports:
      - 9000:9000
    volumes:
      - sentry:/var/lib/sentry/files
      - ./:/etc/sentry
    environment:
      SENTRY_MEMCACHED_HOST: memcached
      SENTRY_REDIS_HOST: redis
      SENTRY_POSTGRES_HOST: postgres
      SENTRY_EMAIL_HOST: smtp
    env_file: .env
    restart: always
    depends_on:
      - redis
      - postgres
      - memcached
      - smtp

  cron:
    image: sentry:9.1-onbuild
    volumes:
      - sentry:/var/lib/sentry/files
      - ./:/etc/sentry
    environment:
      SENTRY_MEMCACHED_HOST: memcached
      SENTRY_REDIS_HOST: redis
      SENTRY_POSTGRES_HOST: postgres
      SENTRY_EMAIL_HOST: smtp
    env_file: .env
    restart: always
    depends_on:
      - redis
      - postgres
      - memcached
      - smtp
    command: run cron

  worker:
    image: sentry:9.1-onbuild
    volumes:
      - sentry:/var/lib/sentry/files
      - ./:/etc/sentry
    environment:
      SENTRY_MEMCACHED_HOST: memcached
      SENTRY_REDIS_HOST: redis
      SENTRY_POSTGRES_HOST: postgres
      SENTRY_EMAIL_HOST: smtp
    env_file: .env
    restart: always
    depends_on:
      - redis
      - postgres
      - memcached
      - smtp
    command: run worker
```



## Интеграция

### Django (+ Celery)

Установка пакета:

```bash
sudo pip install sentry-sdk
```

Файл `settings.py`:

```python
import sentry_sdk
from sentry_sdk.integrations.django import DjangoIntegration
from sentry_sdk.integrations.celery import CeleryIntegration

sentry_sdk.init(dsn='http://public_key@sentry_host/project_id', integrations=[
	DjangoIntegration(),
	CeleryIntegration(),
])
```

### Vue.js

Установка пакетов:

```bash
sudo npm install --save @sentry/browser @sentry/integrations
```

Файл `src/main.js`:

```js
import * as Sentry from '@sentry/browser';
import * as Integrations from '@sentry/integrations';
import Vue from 'vue';

Sentry.init({
    dsn: 'http://public_key@sentry_host/project_id',
    integrations: [
        new Integrations.Vue({
            Vue,
            attachProps: true,
        }),
    ],
});
```



## Полезные ссылки

- [Оригинал статьи](https://system-admins.ru/sentry-operativnyj-monitoring-oshibok/)
- [Документация](https://docs.sentry.io/)