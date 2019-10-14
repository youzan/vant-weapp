"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../common/component");
var utils_1 = require("../common/utils");
component_1.VantComponent({
    props: {
        size: {
            type: String,
            observer: 'setSizeWithUnit'
        },
        type: {
            type: String,
            value: 'circular'
        },
        color: {
            type: String,
            value: '#c9c9c9'
        },
        textSize: {
            type: String,
            observer: 'setTextSizeWithUnit'
        },
        vertical: Boolean
    },
    data: {
        sizeWithUnit: '30px',
        textSizeWithUnit: '14px'
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
