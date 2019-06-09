# Prometheus

- [Описание](#описание)
- [Компоненты](#компоненты)
- [Установка](#установка)
- [Полезные ссылки](#полезные-ссылки)

## Описание

**Prometheus** — открытая (Apache 2.0) time series СУБД, написанная на языке Go и изначально разработанная в компании SoundCloud. Другими словами, хранит ваши метрики. Интересной особенностью Prometheus является то, что он сам запрашивает метрики с заданного множества сервисов (Pull). За счет этого у Prometheus не могут забиться какие-либо очереди, а значит мониторинг никогда не станет узким местом системы. Также проект интересен тем, что он принципиально не предлагает какого-либо горизонтального масштабирования или high availability.



## Компоненты

Prometheus состоит из следующих компонентов:

- **Сервер Prometheus**
- **Клиентские библиотеки**
- **Push Gateway** — работа с кратковременными процессами (когда сервис работает слишком мало времени, что бы Prometheus имел возможность выполнять к нему запросы для получения метрик)
- **Exporters** — сбор метрик из сторонних сервисов
- **AlertManager** — менеджер уведомлений

![Схема работы](files/prometheus.png)

Prometheus имеет центральный компонент, называемый **Prometheus Server**. Его основная задача — хранить и мониторить **определенные объекты**. Объектом может стать что угодно: Linux-сервер, сервер Apache, один из процессов, сервер базы данных или любой другой компонент системы, которую вы хотите контролировать. В терминах Prometheus главная служба мониторинга называется **сервером Prometheus**, а объекты мониторинга — **целевыми объектами**.

Каждый элемент целевого объекта, который вы хотите мониторить (статус центрального процессора, память или любой другой элемент), называется метрикой. Таким образом, Prometheus собирает через HTTP метрики целевых объектов, хранит их локально или удаленно и отображает.

Сервер Prometheus считывает целевые объекты с заданным интервалом и хранит их в **базе данных временных рядов**. Целевые объекты и временной интервал считывания метрик задаются в конфигурационном файле `prometheus.yml`.

Информация о месте хранения метрик запрашивается у базы данных временных рядов Prometheus, используя язык запросов **PromQL**. Другими словами, с помощью PromQL вы просите сервер Prometheus показать статус конкретного целевого объекта в данный момент времени и получаете метрики.

Prometheus предоставляет клиентские библиотеки на нескольких языках, которые вы можете использовать для обеспечения работоспособности приложения. Но Prometheus — это не только мониторинг приложений. Для мониторинга сторонних систем (таких как сервер Linux, демон MySQL и т.д.) используются **экспортеры (exporters)**. Экспортер — часть программного обеспечения, которое получает существующие метрики от сторонней системы и экспортирует их в формат, понятный серверу Prometheus.

Prometheus имеет компонент управления оповещениями, называемый **AlertManager**. Он служит для запуска оповещений через Email, Slack или другие клиентские уведомления. Правила оповещения определяются в файле `alert.rules`. Например, если сервер Prometheus найдет значение метрики, превышающее порог, который определен в файле `alert.rules`, Alert Manager разошлет оповещения.



## Установка

Файл конфигурации `/etc/prometheus/prometheus.yml`:

```yml
# Global config
global:
  scrape_interval:     10s # Default is every 1 minute.
  evaluation_interval: 10s # Default is every 1 minute.

# Here it's Prometheus itself
scrape_configs:
  # The job name is added as a label job=<job_name> to any timeseries scraped from this config
  # Metrics path defaults to 'http://target/metrics'
  - job_name: 'prometheus'
    static_configs:
    - targets: ['localhost:9090']
  - job_name: 'node-exporter'
    static_configs:
    - targets: ['localhost:9100']
  - job_name: 'postgres-exporter'
    static_configs:
    - targets: ['localhost:9101']
  - job_name: 'cadvisor-exporter'
    static_configs:
    - targets: ['localhost:9102']
```

Установка с помощью Docker — файл `docker-compose.yml`:

```yml
version: '2'

services:
  prometheus:
    image: prom/prometheus
    network_mode: host
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
    command:
      - --config.file=/etc/prometheus/prometheus.yml
    restart: always

  node-exporter:
    image: prom/node-exporter
    ports:
      - 9100:9100
    volumes:
      - /proc:/host/proc:ro
      - /sys:/host/sys:ro
      - /:/rootfs:ro
    command: 
      - --collector.supervisord
      - --collector.supervisord.url=http://login:pass@localhost:9001/RPC2
    restart: always
    depends_on:
      - prometheus

  postgres-exporter:
    image: wrouesnel/postgres_exporter
    ports:
      - 9101:9101
    command: 
      - --web.listen-address=:9101
      - --disable-settings-metrics
    environment:
      - DATA_SOURCE_NAME=postgresql://postgres:postgres@localhost:5432
    restart: always
    depends_on:
      - prometheus

  cadvisor-exporter:
    image: google/cadvisor
    ports:
      - 9102:8080
    volumes:
      - /:/rootfs:ro
      - /var/run:/var/run:rw
      - /sys:/sys:ro
      - /var/lib/docker/:/var/lib/docker:ro
    restart: always
```



## Полезные ссылки

- [Документация](https://prometheus.io/docs/introduction/overview/)
- [PromQL Cheat Sheet](https://github.com/jitendra-1217/promql.cheat.sheet)
- [Установка Prometheus](http://www.8host.com/blog/ustanovka-prometheus-s-pomoshhyu-docker-v-ubuntu-14-04/)
- [Мониторинг с помощью Prometheus](https://medium.com/southbridge/prometheus-monitoring-ba8fbda6e83)