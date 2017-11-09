#!/bin/sh

basepath=$(dirname $0)

rm -rf $basepath/../../assets/icons/svg
sketchtool export slices --formats=svg --overwriting=YES --save-for-web=YES --output=$basepath/../../assets/icons/svg $basepath/../../assets/icons/icons.sketch
