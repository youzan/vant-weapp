"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../common/component");
var utils_1 = require("../common/utils");
component_1.VantComponent({
    props: {
        color: String,
        vertical: Boolean,
        type: {
            type: String,
            value: 'circular'
        },
        size: {
            type: String,
            observer: 'setSizeWithUnit'
        },
        textSize: {
            type: String,
            observer: 'setTextSizeWithUnit'
        }
    },
    methods: {
        setSizeWithUnit: function (size) {
            this.setData({
                sizeWithUnit: utils_1.addUnit(size)
            });
        },
        setTextSizeWithUnit: function (size) {
            this.set({
                textSizeWithUnit: utils_1.addUnit(size)
            });
        }
    }
});
