# Logstash

- [Описание](#описание)
- [Установка](#установка)
	- [Установка как сервис](#установка-как-сервис)
	- [Установка с помощью Docker](#установка-с-помощью-docker)
	- [Пример конфигурации](#пример-конфигурации)
- [Интеграция](#интеграция)
- [Полезные ссылки](#полезные-ссылки)

## Описание

**Logstash** — утилита для сборки, фильтрации и последующего перенаправления в конечное хранилище данных. Оно является бесплатным и open source приложением. Тип лицензии Apache 2.0.


## Установка

### Установка как сервис

```bash
# Установка
sudo apt-get install logstash

# Создание файла конфигурации
sudo vi /etc/logstash/conf.d/logstasg.conf

# Запуск
sudo update-rc.d logstash defaults 95 10
sudo service logstash start
```

### Установка с помощью Docker

Файл `docker-compose.yml`:

```yml
version: '2'

volumes:
  elasticsearch_data: {}

services:
  elasticsearch:
    image: elasticsearch:7.1.0
    ports:
      - 9200:9200
    volumes:
      - elasticsearch_data:/usr/share/elasticsearch/data
      - ./elasticsearch/elasticsearch.yml:/usr/share/elasticsearch/config/elasticsearch.yml:ro
    restart: always

  logstash:
    image: logstash:7.1.0
    ports:
      - 5959:5959
    volumes:
      - ./logstash/logstash.yml:/usr/share/logstash/config/logstash.yml:ro
      - ./logstash/pipeline:/usr/share/logstash/pipeline:ro
    restart: always
    depends_on:
      - elasticsearch
```

### Пример конфигурации 

Файл `logstash.yml`:

```yml
http.host: "0.0.0.0"
xpack.monitoring.elasticsearch.hosts: [ "http://elasticsearch:9200" ]
```

Файл `logstasg.conf`:

```
input {
  tcp {
    port => 5959
    codec => json
  }
}
filter {
  if [type] == "nginx" {
    grok {
      match => {
        "message" => "%{IPORHOST:remote_ip} - %{DATA:user_name} \[%{HTTPDATE:access_time}\] \"%{WORD:http_method} %{DATA:url} HTTP/%{NUMBER:http_version}\" %{NUMBER:response_code} %{NUMBER:body_sent_bytes} \"%{DATA:referrer}\" \"%{DATA:agent}\""
      }
    }
  }
}
output {
  stdout {
    codec => rubydebug
  }
  if [type] == "nginx" {
    elasticsearch {
      hosts => "elasticsearch:9200"
      index => "nginx-%{+YYYY.MM.dd}"
    }
  }
  else if [type] == "django" {
    elasticsearch {
      hosts => "elasticsearch:9200"
      index => "django-%{+YYYY.MM.dd}"
    }
 }
 else {
    elasticsearch {
      hosts => "elasticsearch:9200"
      index => "unknown"
    }
  }
}
```



## Интеграция

### Django

Установка пакетов:

```bash
sudo pip install python-logstash elasticsearch-dsl
```

Файл `settings.py`:

```python
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'logstash': {
            'level': 'INFO',
            'class': 'logstash.TCPLogstashHandler',
            'host': 'localhost',
            'port': 5959,
            'version': 1,
            'message_type': 'django',
            'fqdn': False,
            'tags': ['tag1', 'tag2'],
        },
    },
    'loggers': {
        'django.request': {
            'level': 'INFO',
            'handlers': ['logstash'],
        },
    },
}
```



## Полезные ссылки

- [Документация](https://www.elastic.co/guide/en/logstash/current/index.html)