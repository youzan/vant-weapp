#!/bin/sh

basepath=$(dirname $0)

rm -rf $basepath/../../assets/icons
sketchtool export slices --formats=svg --overwriting=YES --save-for-web=YES --output=$basepath/../../assets/icons $basepath/../../assets/icons.sketch
