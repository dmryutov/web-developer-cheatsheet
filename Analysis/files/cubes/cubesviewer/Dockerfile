FROM python:2.7-slim

ENV CUBESVIEWER_SERVER_VERSION=2.0.2 PYTHONUNBUFFERED=1 PIP_DISABLE_PIP_VERSION_CHECK=on

ADD https://github.com/jjmontesl/cubesviewer-server/archive/v$CUBESVIEWER_SERVER_VERSION.tar.gz /
RUN tar xfz /v$CUBESVIEWER_SERVER_VERSION.tar.gz \
    && rm -f /v$CUBESVIEWER_SERVER_VERSION.tar.gz \
    && cd cubesviewer-server-$CUBESVIEWER_SERVER_VERSION \
    && pip install -q -r requirements.txt \
    && mkdir -p /db
  
ADD entrypoint.sh initial_data.json /
ADD settings.py /cubesviewer-server-$CUBESVIEWER_SERVER_VERSION/cvapp/cvapp

WORKDIR /cubesviewer-server-$CUBESVIEWER_SERVER_VERSION/cvapp

EXPOSE 8000
ENTRYPOINT ["/entrypoint.sh"]
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]