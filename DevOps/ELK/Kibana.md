# Kibana

- [Описание](#описание)
- [Установка](#установка)
	- [Установка как сервис](#установка-как-сервис)
	- [Установка с помощью Docker](#установка-с-помощью-docker)
	- [Пример конфигурации](#пример-конфигурации)
- [Полезные ссылки](#полезные-ссылки)

## Описание

**Kibana** — сервис для визуализации данных Elasticsearch и навигации их по Elastic Stack. Он помогает создавать дашборды, настраивать форму визуализации, формировать интерактивные графики, даже представлять геоданные, анализировать связи и изучать аномалии с машинным обучением.


## Установка

### Установка как сервис

```bash
# Установка
sudo apt-get -y install kibana

# Изменить хост - добавить строку "server.host: "localhost""
sudo vi /opt/kibana/kibana.yml

# Запуск
sudo update-rc.d kibana defaults 95 10
sudo service kibana start
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

  kibana:
    image: kibana:7.1.0
    ports:
      - 5601:5601
    volumes:
      - ./kibana/kibana.yml:/usr/share/kibana/config/kibana.yml:ro
    restart: always
    depends_on:
      - elasticsearch
```

### Пример конфигурации

Файл `kibana.yml`:

```yml
server.name: kibana
server.host: "0"
elasticsearch.hosts: [ "http://elasticsearch:9200" ]
xpack.monitoring.ui.container.elasticsearch.enabled: true
```



## Полезные ссылки

- [Документация](https://www.elastic.co/guide/en/kibana/current/index.html)