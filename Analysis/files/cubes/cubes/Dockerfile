FROM python:3.7-slim

ENV CUBES_VERSION=1.1 PYTHONUNBUFFERED=1 PIP_DISABLE_PIP_VERSION_CHECK=on

ADD https://github.com/DataBrewery/cubes/archive/v$CUBES_VERSION.tar.gz /
RUN DEPS="libpq-dev" \
    && BUILD_DEPS="build-essential libpcre3-dev" \
    && PYTHON_DEPS="psycopg2" \
    && apt-get update && apt-get install -y --no-install-recommends $DEPS $BUILD_DEPS \
    && tar xfz v$CUBES_VERSION.tar.gz \
    && rm -f v$CUBES_VERSION.tar.gz \
    && cd cubes-$CUBES_VERSION \
    && pip install --no-cache-dir -q -r requirements.txt -r requirements-optional.txt $PYTHON_DEPS \
    && python setup.py install \
    && apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false $BUILD_DEPS \
    && rm -rf /var/lib/apt/lists/*

# ADD data /data

EXPOSE 5000
CMD ["slicer", "serve", "/data/slicer.ini"]