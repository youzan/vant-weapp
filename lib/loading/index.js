"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../common/component");
component_1.VantComponent({
    props: {
        color: String,
        vertical: Boolean,
        type: {
            type: String,
            value: 'circular'
        },
        size: String,
        textSize: String
    },
    data: {
        array12: Array.from({ length: 12 }),
        // hack baidu
        style: 'font-size: 0; line-height: 1;',
    }
});
