"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../common/component");
var color_1 = require("../common/color");
var safe_area_1 = require("../mixins/safe-area");
component_1.VantComponent({
    mixins: [safe_area_1.safeArea()],
    props: {
        text: String,
        color: {
            type: String,
            value: '#fff'
        },
        backgroundColor: {
            type: String,
            value: color_1.RED
        },
        duration: {
            type: Number,
            value: 3000
        }
    },
    methods: {
        show: function () {
            var _this = this;
            var duration = this.data.duration;
            clearTimeout(this.timer);
            this.set({
                show: true
            });
            if (duration > 0 && duration !== Infinity) {
                this.timer = setTimeout(function () {
                    _this.hide();
                }, duration);
            }
        },
        hide: function () {
            clearTimeout(this.timer);
            this.set({
                show: false
            });
        }
    }
});
