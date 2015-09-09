#!/usr/bin/env bash

set -e
set -o pipefail

function run_backend(){
    local err_log=$LOG_FOLDER/error.log
    local acc_log=$LOG_FOLDER/access.log
    local venv_base=~/.mfl_api_venv

    if [[ ! -e "$LOG_FOLDER" ]]; then
        mkdir "$LOG_FOLDER"
    fi

    # setup api server
    virtualenv --quiet "$venv_base"
    source $venv_base/bin/activate
    pip install --quiet -e git+https://github.com/masterfacilitylist/mfl_api@develop#egg=mfl_api
    cd $venv_base/src/mfl-api
    cp .env-example .env
    wget "$DUMP_URL" -O mfl_dump.tar.gz --quiet
    tar xzf mfl_dump.tar.gz
    psql circle_test ubuntu -c "create extension if not exists postgis;" --quiet -o /dev/null
    psql circle_test ubuntu -c "create role mfl with password 'mfl' login superuser;" --quiet -o /dev/null
    psql circle_test ubuntu -c "create database mfl;" --quiet -o /dev/null
    psql circle_test ubuntu -f mfl_dump.sql --quiet -o /dev/null
    python manage.py migrate -v0
    gunicorn -w 3 --timeout=300 --graceful-timeout=300 config.wsgi:application --bind=127.0.0.1:8061 --access-logfile "$acc_log" --error-logfile "$err_log" --log-level info --daemon
    deactivate
    cd $OLDPWD
}

case $CIRCLE_NODE_INDEX in
0)
    export RUN_SAUCE_TESTS=true
    grunt test:unit
    ;;
1)
    # run_backend

    grunt test:unit

    exit 0
    
    cd $BUILD_DIR
    curl --retry 5 --retry-delay 2 -Lv http://localhost:8061 -o /dev/null
    nohup grunt connect:prod &
    npm run update-webdriver
    grunt protractor:e2e

    killall --wait grunt
    killall --wait sc
    ;;
2)
    export RUN_SAUCE_TESTS=true

    exit 0
    
    run_backend

    # setup saucelabs connect
    cd $HOME
    wget --quiet https://saucelabs.com/downloads/sc-latest-linux.tar.gz
    tar xzf sc-latest-linux.tar.gz
    cd sc-*-linux
    nohup ./bin/sc -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY -f ~/sc_ready &
    while [ ! -e ~/sc_ready ]; do sleep 1; done  # Wait for tunnel to be ready


    cd $BUILD_DIR
    curl --retry 5 --retry-delay 2 -Lv http://localhost:8061 -o /dev/null
    nohup grunt connect:prod &
    grunt test:e2e

    killall --wait grunt
    killall --wait sc

esac
