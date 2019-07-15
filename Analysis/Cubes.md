# Cubes

- [Описание](#описание)
- [CubesViewer](#cubesviewer)
- [Установка](#установка)
- [Полезные ссылки](#полезные-ссылки)

## Описание

**Cubes** — light-weight Python framework and OLAP HTTP server for easy development of reporting applications and aggregate browsing of multi-dimensionally modeled data.

**Features:**

- **Model** — business and analyst's point of view on data
	-   Dimensions with multiple hierarchies
	-   User oriented metadata
	-   Dimension templates - define complex dimensions
	-   Localization of model and data
- **Slicer** — a HTTP OLAP cube server for aggregation queries.
	-   Easy drilling-down
	-   Slicing and dicing
	-   Serves aggregates, dimension details, facts
	-   Provides all necessary metadata for a reporting application
- **Aggregated Browsing** — easy development of exploration tools
	-   Slice and dice through dimensions
	-   Drill-down through any hierarchy
	-   Automatic next level selection, if desired
	-   Get dimension values or all facts within a cut
- **Backend and SQL** — powered by the SQLAlchemy which supports multiple databases including PostgreSQL, MySQL, Oracle, simple SQLite and many others
	- Easy to prototype on top of existing, arbitrary star or snowflake looking schemas
	- Logical-to-physical mapping that supports multiple database schemas in databases such as PostgreSQL or Oracle
	- Denormalization by view or materialized by table



## CubesViewer

**CubesViewer**  — visual, responsive HTML5 Django application and library for exploring and visualizing different types of datasets.

CubesViewer can be used for data exploration and data auditory, generation of reports, chart design and embedding, and as a (simple) company-wide analytics application.

CubesViewer can be embedded fully or partially into other websites. Useful to show dynamic analytics or charts on other website articles or applications. Embedded charts can also be manipulated in the same way they are designed within CubesViewer Studio.

**Features:**

- **OLAP Browser** — explore data across dimensions. Filter and drill down to discover new facts and trends
- **Charts** — a range of data visualization options is available. Switch between representations with a click
- **Series** — define and operate with data series to discover and highlight features in your data
- **Export** — export data and charts
- **Responsive** — responsive design, tablet friendly
- **Undo**, **redo**, **clone** — CubesViewer gives freedom to easily try different variations of a view
- **Embed views** — views can be embedded in other web sites
- **CubesViewer Server** — optional multi-user backend for storing and sharing views




## Установка

### Структура файлов

- [cubes](files/cubes/cubes) — файлы Cubes
	- [data](files/cubes/cubes/data/)
		- [model.json](files/cubes/cubes/data/model.json) — описание куба (1 экземпляр Model)
		- [slicer.ini](files/cubes/cubes/data/slicer.ini) — конфигурация Cubes
	- [Dockerfile](files/cubes/cubes/Dockerfile) — сценарий сборки Docker-образа Cubes
- [cubesviewer](files/cubes/cubesviewer) — файлы CubesViewer
	- [Dockerfile](files/cubes/cubesviewer/Dockerfile) — сценарий сборки Docker-образа CubesViewer
	- [entrypoint.sh](files/cubes/cubesviewer/entrypoint.sh) — точка входа в контейнер (применение миграций, создание суперпользователя)
	- [initial_data.json](files/cubes/cubesviewer/initial_data.json) — данные для инициализации БД (1 суперпользователь — логин `admin`, пароль `admin12345`)
	- [settings.py](files/cubes/cubesviewer/settings.py) — конфигурация Django-приложения
- [docker-compose.yml](files/cubes/docker-compose.yml) — описание сервисов docker-compose
- [env](files/cubes/env) — переменные окружения

### Запуск

Сборка и запуск Docker-контейнеров:

```bash
sudo docker-compose up -d
```



## Полезные ссылки

- [Документация Cubes](https://cubes.readthedocs.io/en/latest/index.html)
- [Конфигурация Slicer](https://pythonhosted.org/cubes/backends/slicer.html)
- [Конфигурация Model](https://pythonhosted.org/cubes/slicer.html#model-convert)
- [Официальный сайт CubesViewer](http://www.cubesviewer.com/)
- [Пример конфигурации куба](https://github.com/DataBrewery/cubes-examples/tree/master/procurements)