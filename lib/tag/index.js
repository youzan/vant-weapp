"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../common/component");
var color_1 = require("../common/color");
var DEFAULT_COLOR = '#999';
var COLOR_MAP = {
    danger: color_1.RED,
    primary: color_1.BLUE,
    success: color_1.GREEN,
    warning: color_1.ORANGE
};
component_1.VantComponent({
    props: {
        size: String,
        type: String,
        mark: Boolean,
        color: String,
        plain: Boolean,
        round: Boolean,
        textColor: String
    },
    computed: {
        style: function () {
            var _a;
            var color = this.data.color || COLOR_MAP[this.data.type] || DEFAULT_COLOR;
            var key = this.data.plain ? 'color' : 'background-color';
            var style = (_a = {}, _a[key] = color, _a);
            if (this.data.textColor) {
                style.color = this.data.textColor;
            }
            return Object.keys(style).map(function (key) { return key + ": " + style[key]; }).join(';');
        }
    }
});
