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
    }
});
