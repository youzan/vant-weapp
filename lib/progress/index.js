"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../common/component");
var color_1 = require("../common/color");
component_1.VantComponent({
    props: {
        inactive: Boolean,
        percentage: Number,
        pivotText: String,
        pivotColor: String,
        showPivot: {
            type: Boolean,
            value: true
        },
        color: {
            type: String,
            value: color_1.BLUE
        },
        textColor: {
            type: String,
            value: '#fff'
        }
    },
    data: {
        pivotWidth: 0,
        progressWidth: 0
    },
    watch: {
        pivotText: 'getWidth',
        showPivot: 'getWidth'
    },
    computed: {
        portionStyle: function () {
            var width = (this.data.progressWidth - this.data.pivotWidth) * this.data.percentage / 100 + 'px';
            var background = this.getCurrentColor();
            return "width: " + width + "; background: " + background + "; ";
        },
        pivotStyle: function () {
            var color = this.data.textColor;
            var background = this.data.pivotColor || this.getCurrentColor();
            return "color: " + color + "; background: " + background;
        },
        text: function () {
            return this.data.pivotText || this.data.percentage + '%';
        }
    },
    mounted: function () {
        this.getWidth();
    },
    methods: {
        getCurrentColor: function () {
            return this.data.inactive ? '#cacaca' : this.data.color;
        },
        getWidth: function () {
            var _this = this;
            this.getRect('.van-progress').then(function (rect) {
                _this.set({
                    progressWidth: rect.width
                });
            });
            this.getRect('.van-progress__pivot').then(function (rect) {
                _this.set({
                    pivotWidth: rect.width || 0
                });
            });
        }
    }
});
