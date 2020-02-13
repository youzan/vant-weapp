#!/usr/bin/env bash

rm -rf ./example_swan

wx2swan ./example

node ./build/baidu_more.js
