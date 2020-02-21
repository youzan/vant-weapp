"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../common/component");
component_1.VantComponent({
    props: {
        dot: {
            type: Boolean,
            observer: 'updateShow',
        },
        info: {
            type: null,
            observer: 'updateShow',
        },
        customStyle: String
    },
    data: {
        show: false,
    },
    methods: {
        updateShow: function () {
            var _a = this.data, info = _a.info, dot = _a.dot;
            this.setData({
                show: (info !== null && info !== '') || dot,
            });
        }
    },
});
