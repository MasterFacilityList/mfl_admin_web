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
    grunt connect:dev & 
    grunt test:e2e
esac
