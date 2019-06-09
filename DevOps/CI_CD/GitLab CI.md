# GitLab CI

- [Описание](#описание)
- [Установка](#установка)
- [Пример конфигурации](#пример-конфигурации)
- [Полезные ссылки](#полезные-ссылки)

## Описание

**GitLab** — сервис, основанный на SAAS — одной из форм облачных вычислений, где без труда можно разместить Git-репозиторий, отслеживать возможные проблемы и писать wiki с помощью языка разметки Markdown.

**GitLab CI** также позволяет настраивать непрерывную интеграцию с использованием любого из образов Docker, доступного на Docker Hub.

GitLab CI использует YAML файл `.gitlab-ci.yml` для определения конфигураций проекта, включающих в себя определение всех этапов, которые будут выполняться после того, как конвейер CI/CD запускается в ответ на `git push` / `git merge`.



## Установка

Установка как сервис:

```bash
sudo wget -O /usr/local/bin/gitlab-runner https://gitlab-runner-downloads.s3.amazonaws.com/latest/binaries/gitlab-runner-linux-amd64
sudo chmod +x /usr/local/bin/gitlab-runner
curl -sSL https://get.docker.com/ | sh
sudo useradd --comment  'GitLab Runner'  --create-home gitlab-runner --shell /bin/bash
sudo gitlab-runner install  --user=gitlab-runner --working-directory=/home/gitlab-runner sudo gitlab-runner start
```

Установка с помощью Docker — файл `docker-compose.yml`:

```yml
version: '2'

services:
  runner:
    image: gitlab/gitlab-runner
    volumes:
      - /etc/gitlab-runner:/etc/gitlab-runner
      - /var/run/docker.sock:/var/run/docker.sock
      - ./certs/ca.crt:/etc/gitlab-runner/certs/ca.crt
    restart: always
```

Регистрация воркера:

```bash
# Внутри контейнера
gitlab-runner register \
--non-interactive \
--tls-ca-file /etc/gitlab-runner/certs/ca.crt \
--url "https://gitlab_host/" \
--registration-token "token" \
--description "Text description" \
--tags "tag1,tag2" \
--executor docker \
--docker-image alpine \
--run-untagged="true" \
--docker-volumes /etc/hosts:/etc/hosts \
--docker-volumes /var/run/docker.sock:/var/run/docker.sock \
--docker-volumes /etc/gitlab-runner/certs/ca.crt:/etc/gitlab-runner/certs/ca.crt
```



## Пример конфигурации

```yml
.common_config: &common_config
  tags:
    - tag1
  only:
    - branches
  except:
    - tags

variables:
  SERVER: 'remote_server'
  REMOTE_DIR: 'remote_dir_path'
  PIP_CACHE_DIR: '$CI_PROJECT_DIR/.cache/pip'
  GIT_SSL_NO_VERIFY: '1'
  POSTGRES_DB: 'db'
  POSTGRES_USER: 'postgres'
  POSTGRES_PASSWORD: ''

cache:
  paths:
    - .cache/pip
    - venv/
    - frontend/node_modules/

stages:
  - test
  - build
  - deploy

test:backend:
  <<: *common_config
  image: python:3.7-slim
  stage: test
  before_script:
    # Install packages
    - apt update
      && mkdir -p /usr/share/man/man1
      && mkdir -p /usr/share/man/man7
      && apt install -y --no-install-recommends sudo libpq-dev build-essential libpcre3-dev postgresql postgresql-contrib
    - sed -i -e 's/peer/trust/g' /etc/postgresql/9.6/main/pg_hba.conf
    - service postgresql start
    # Create DB and schema
    - sudo -u postgres psql -c "CREATE DATABASE $POSTGRES_DB;"
    - chmod +x $PWD/postgres/init.sh && $PWD/postgres/init.sh
    # Install Python dependencies
    - cd $PWD
    - pip install virtualenv
    - virtualenv venv
    - source venv/bin/activate
    - pip install -r backend/requirements.txt
  script:
    - cd $PWD/backend
    - coverage run --source='.'
     --omit='manage.py,*wsgi.py,*settings*,*init*,*apps.py,*migrations*,*tests*'
     manage.py test --keepdb && coverage html && coverage report
  artifacts:
    paths:
     - $PWD/backend/htmlcov
  coverage: /^TOTAL\s+\d+\s+\d+\s+(\d+\%)$/

test:frontend:
   <<: *common_config
   image: node:10-alpine
   stage: test
   before_script:
     - cd $PWD/frontend
     - npm install -g @vue/cli
     - npm install
   script:
     - npm run lint
     - npm run lint:style
     - npm run test
   artifacts:
     paths:
       - $PWD/frontend/coverage
   coverage: /Statements\s*:\s*([\d\.]+)/

build:frontend:
  <<: *common_config
  image: node:10-alpine
  stage: build
  script:
    - cd $PWD/frontend
    - npm run build
  artifacts:
    paths:
      - $PWD/static

build:documentation:
  <<: *common_config
  image: python:3.7-slim
  stage: build
  script:
    - cd $PWD/docs
    - ../venv/bin/mkdocs build --clean
  artifacts:
    paths:
      - $PWD/docs

deploy:
  <<: *common_config
  image: alpine
  stage: deploy
  before_script:
    - apk update && apk add openssh-client bash rsync
    - eval $(ssh-agent -s)
    - bash -c 'ssh-add <(echo "${SSH_PRIVATE_KEY}")'
    - mkdir -p ~/.ssh
    - echo "${SSH_HOST_KEY}" > ~/.ssh/known_hosts
  script:
    - ssh -t $SERVER sudo mkdir $REMOTE_DIR || true
    - ssh -t $SERVER sudo chown -R sysopr:sysopr $REMOTE_DIR
    - rsync -avz -e "ssh" --progress
      --exclude=.idea --exclude=.git --exclude=*/pycache --exclude=*.env
      --exclude=frontend/node_modules --exclude=frontend/build/* --exclude=frontend/dist/*
      --exclude=notifier/node_modules
      --exclude=DUMP/* --exclude=./mediafiles/* --exclude=./log/* --exclude=staticfiles
      --exclude=venv --exclude=*._* --exclude=*.DS_*
      $PWD/ $SERVER:$REMOTE_DIR || true
    - ssh -t $SERVER sudo chown -R sysopr:sysopr $REMOTE_DIR
    - ssh -t $SERVER sudo chmod +x $REMOTE_DIR/scripts/*.sh
    - ssh -t $SERVER sudo $REMOTE_DIR/scripts/restart.sh || true
  only:
    - master
```



## Полезные ссылки

- [Документация](https://docs.gitlab.com/ee/ci/)
- [CI with GitLab](files/ci_with_gitlab.pdf)