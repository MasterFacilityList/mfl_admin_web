#!/usr/bin/env bash

case $CIRCLE_NODE_INDEX in
0)
    export RUN_SAUCE_TESTS=true
    grunt test:unit
    ;;
1)
    grunt test:unit
    ;;
2)
    npm run update-webdriver
    grunt connect:prod &
    grunt test:e2e
esac
