# PostgreSQL

- [Описание](#описание)
- [Сравнение с MySQL](#сравнение-с-mysql)
- [Типы данных](#типы-данных)
- [Установка](#установка)
- [Полезные команды](#полезные-команды)
- [Полезные ссылки](#полезные-ссылки)

## Описание

**PostgreSQL** — это свободно распространяемая объектно-реляционная система управления базами данных (ORDBMS), наиболее развитая из открытых СУБД в мире и являющаяся реальной альтернативой коммерческим базам данных.

PostgreSQL представляет из себя объектно реляционную базу данных, которая работает только на одном движке — **Storage Engine**. Все таблицы представлены в виде объектов, они могут наследоваться, а все действия с таблицами выполняются с помощью объективно ориентированных функций. Как и в MySQL все данные хранятся на диске, в специально отсортированных файлах, но структура этих файлов и записей в них очень сильно отличается.

PostgreSQL поддерживает использование курсоров для перемещения по полученным данным. Вы получаете только указатель, весь ответ хранится в памяти сервера баз данных. Этот указатель можно сохранять между сеансами. Здесь поддерживается построение индексов сразу для нескольких столбцов таблицы. Кроме того, индексы могут быть различных типов, кроме **hash** и **b-tree** доступны **GiST** и **SP-GiST** для работы с городами, **GIN** для поиска по тексту, **BRIN** и **Bloom**.

PostgreSQL поддерживает регулярные выражения в запросах, рекурсивных запросов и наследования таблиц. Но тут есть несколько ограничений, например, вы можете добавить новое поле только в конец таблицы.

Вся заголовочная информация таблиц PostgreSQL находится в оперативной памяти. Вы не можете создать таблицу, которая будет не в памяти. Записи таблицы сортируются по индексу, а поэтому вы можете их очень быстро извлечь. Для большего удобства вы можете применять несколько индексов к одной таблице.



## Сравнение с MySQL

- Объектно-реляционная БД
- Работает быстрее, за исключениям использования первичных ключей
- Индексы по выражению, частичные индексы
- Неблокирующее обновление индексов
- Супер быстрое удаление и добавление колонок в таблицах любого размера
- Меньше дедлоков при больших нагрузках
- Несколько типов индексов
- Количество типов просто огромно + пользовательские типы
- Точнее соответствует стандарту ANSI и гораздо строже относится к входным данным
- Модуль полнотекстового поиска (MySQL только для MyISAM)
- Транзакционный DDL
- Возможность писать процедуры практически на любом языке, мощный внутренний язык PL/pgSQL
- Намного лучше работает на многоядерных системах
- Продвинутый оптимизатор



## Типы данных

- **bigint** — знаковое 8-байтовое целое
- **bigserial** — автоматически увеличиваемое 8-байтовое целое
- **bit** — двоичная строка фиксированной длины
- **bit varying** — двоичная строка переменной длины
- **boolean** — флаг
- **box** — прямоугольник на плоскости
- **byte** — бинарные данные
- **character varying** — строка символов фиксированной длины
- **character** — строка символов переменной длины
- **cidr** — сетевой адрес IPv4 или IPv6
- **circle** — круг на плоскости
- **date** — дата в календаре
- **double precision** — число с плавающей запятой двойной точности
- **inet** — адрес интернет IPv4 или IPv6
- **integer** — знаковое 4-байтное целое число
- **interval** — временной промежуток
- **line** — бесконечная прямая на плоскости
- **lseg** — отрезок на плоскости
- **macaddr** — MAC-адрес
- **money** — денежная величина
- **path** — геометрический путь на плоскости
- **point** — геометрическая точка на плоскости
- **polygon** — многоугольник на плоскости
- **real** — число с плавающей точкой одинарной точности
- **smallint** — двухбайтовое целое число
- **serial** — автоматически увеличиваемое четырехбитное целое число
- **text** — строка символов переменной длины
- **time** — время суток
- **timestamp** — дата и время
- **tsquery** — запрос текстового поиска
- **tsvector** — документ текстового поиска
- **uuid** — уникальный идентификатор
- **xml** — XML-данные



## Установка

```bash
# Установка (Unix)
sudo apt-get install postgresql postgresql-contrib
# Установка (macOS)
brew install postgresql

# Запуск (Unix)
sudo service postgresql start
# Запуск (macOS)
pg_ctl -D /usr/local/var/postgres -l /usr/local/var/postgres/server.log start

# Создать администратора
sudo -u postgres psql
CREATE ROLE admin;
ALTER ROLE admin WITH PASSWORD 'password';
ALTER ROLE admin WITH LOGIN;
ALTER USER admin WITH SUPERUSER;
 
# Добавить IP
/etc/postgresql/9.5/main/pg_hba.conf
# Открыть порт наружу - добавить строку "listen_addresses = '*'"
# https://dba.stackexchange.com/questions/48372/can-listen-addresses-really-be-set-to-a-list
/etc/postgresql/9.5/main/postgresql.conf
sudo service postgresql restart
```



## Полезные команды

### Подключение к БД

```bash
# Зайти в БД как пользователь "postgres"
sudo -u postgres psql
```

### Информация о БД
```sql
-- Физический размер файлов (хранилища) БД
SELECT pg_database_size(current_database());
SELECT pg_database_size('my_database');
SELECT pg_size_pretty(pg_database_size(current_database()));

-- Перечень таблиц БД
SELECT table_name FROM information_schema.tables WHERE table_schema NOT IN ('information_schema', 'pg_catalog');

-- Размер таблицы
SELECT pg_relation_size('accounts');

-- Имя самой большой таблицы
SELECT relname, relpages FROM pg_class ORDER BY relpages DESC LIMIT 1;

-- Подключенные пользователи
SELECT datname,usename,client_addr,client_port FROM pg_stat_activity;

-- Активные соединения пользователя
SELECT datname FROM pg_stat_activity WHERE usename = 'user1';
```

### Работа с пользователями

```sql
-- Посмотреть всех пользователей
SELECT rolname FROM pg_roles;

-- Создать нового пользователя
CREATE ROLE romi_scenario_user;
-- Установить пользователю пароль
ALTER ROLE romi_scenario_user WITH PASSWORD 'password';
-- Разрешить соединяться с базой
GRANT CONNECT ON DATABASE romi TO romi_scenario_user;
-- Разрешить логиниться
ALTER ROLE romi_scenario_user WITH LOGIN;

-- Максимальные права на БД
GRANT ALL PRIVILEGES ON DATABASE modeling_tool TO modeling_tool;
-- Максимальные права на схему
GRANT ALL PRIVILEGES ON SCHEMA project_test TO modeling_tool;
-- Максимальные права на все таблицы схемы
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA project_test TO modeling_tool;
-- Максимальные права на все сиквенсы схемы
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA project_test TO modeling_tool;
```

### Работа с данными

```sql
-- Удалить дубликаты строк (`ctid` всегда есть в каждой таблице)
DELETE FROM customers WHERE ctid NOT IN (SELECT max(id) FROM customers GROUP BY customers.*);

-- Безопасное изменение типа поля
ALTER TABLE customers ALTER COLUMN customer_id TYPE integer USING (customer_id::integer);

-- Пропущенные значения в последовательности
WITH sequence_info AS (SELECT start_value, last_value FROM "SchemaName"."SequenceName")
SELECT generate_series ((sequence_info.start_value), (sequence_info.last_value)) FROM sequence_info
EXCEPT
SELECT customer_id FROM customers;
```

### Бэкапы

```bash
# Создать дамп
sudo -u postgres pg_dump db1 -n schema1 > "dir/dump.sql"
# Создать дамп и заархивировать
sudo -u postgres pg_dump db1 -n schema1 | gzip > "dir/dump.gz"
# Восстановить из дампа
sudo -u postgres psql -d db1 -f "dir/dump.sql"
```

### Система

```bash
# Исправить кодировку БД
pg_dumpall > dump.all
pg_ctl -D /usr/local/var/postgres -l /usr/local/var/postgres/server.log stop
mv /usr/local/var/postgres /usr/local/var/postgres_old
export LC_COLLATE=C
unset LC_ALL
initdb -D /usr/local/var/postgres
pg_ctl -D /usr/local/var/postgres -l /usr/local/var/postgres/server.log start
psql postgres < dump.all
rm -rf /usr/local/var/postgres_old
```

### Прочее

```sql
# Актуализация значений всех сиквенсов
SELECT 'SELECT SETVAL(' ||
	quote_literal(quote_ident(PGT.schemaname) || '.' || quote_ident(S.relname))
	|| ', COALESCE(MAX('
	|| quote_ident(C.attname)
	|| '), 1) ) FROM '
	|| quote_ident(PGT.schemaname)
	|| '.'
	|| quote_ident(T.relname)
	|| ';'
FROM
	pg_class AS S,
	pg_depend AS D,
	pg_class AS T,
	pg_attribute AS C,
	pg_tables AS PGT
WHERE
	S.relkind = 'S'
	AND S.oid = D.objid
	AND D.refobjid = T.oid
	AND D.refobjid = C.attrelid
	AND D.refobjsubid = C.attnum
	AND T.relname = PGT.tablename
ORDER BY S.relname;
```



## Полезные ссылки

- [Документация](https://www.postgresql.org/docs/)
- [Курс "Проектирование СУБД"](https://www.youtube.com/playlist?list=PLrCZzMib1e9pq_sbw7ZEcEU3Yyz1AvE--)
- [Вопросы на собеседование SQL](https://jsehelper.blogspot.com/2016/01/sql-1.html)