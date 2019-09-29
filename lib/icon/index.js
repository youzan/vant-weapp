"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../common/component");
var utils_1 = require("../common/utils");
component_1.VantComponent({
    props: {
        dot: Boolean,
        info: null,
        size: {
            type: null,
            observer: 'setSizeWithUnit'
        },
        color: String,
        customStyle: String,
        classPrefix: {
            type: String,
            value: 'van-icon'
        },
        name: {
            type: String,
            observer: function (val) {
                this.setData({
                    isImageName: val.indexOf('/') !== -1
                });
            }
        }
    },
    data: {
        sizeWithUnit: null,
    },
    methods: {
        onClick: function () {
            this.$emit('click');
        },
        setSizeWithUnit: function (size) {
            this.setData({
                sizeWithUnit: utils_1.addUnit(size)
            });
        }
    }
});
