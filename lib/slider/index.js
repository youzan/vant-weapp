"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../common/component");
var touch_1 = require("../mixins/touch");
component_1.VantComponent({
    mixins: [touch_1.touch],
    props: {
        disabled: Boolean,
        useButtonSlot: Boolean,
        activeColor: String,
        inactiveColor: String,
        max: {
            type: Number,
            value: 100
        },
        min: {
            type: Number,
            value: 0
        },
        step: {
            type: Number,
            value: 1
        },
        value: {
            type: Number,
            value: 0
        },
        barHeight: {
            type: String,
            value: '2px'
        }
    },
    watch: {
        value: function (value) {
            this.updateValue(value, false);
        }
    },
    created: function () {
        this.updateValue(this.data.value);
    },
    methods: {
        onTouchStart: function (event) {
            if (this.data.disabled)
                return;
            this.touchStart(event);
            this.startValue = this.format(this.data.value);
        },
        onTouchMove: function (event) {
            var _this = this;
            if (this.data.disabled)
                return;
            this.touchMove(event);
            this.getRect('.van-slider').then(function (rect) {
                var diff = _this.deltaX / rect.width * 100;
                _this.newValue = _this.startValue + diff;
                _this.updateValue(_this.newValue, false, true);
            });
        },
        onTouchEnd: function () {
            if (this.data.disabled)
                return;
            this.updateValue(this.newValue, true);
        },
        onClick: function (event) {
            var _this = this;
            if (this.data.disabled)
                return;
            this.getRect('.van-slider').then(function (rect) {
                var value = (event.detail.x - rect.left) / rect.width * 100;
                _this.updateValue(value, true);
            });
        },
        updateValue: function (value, end, drag) {
            value = this.format(value);
            this.set({
                value: value,
                barStyle: "width: " + value + "%; height: " + this.data.barHeight + ";"
            });
            if (drag) {
                this.$emit('drag', { value: value });
            }
            if (end) {
                this.$emit('change', value);
            }
        },
        format: function (value) {
            var _a = this.data, max = _a.max, min = _a.min, step = _a.step;
            return Math.round(Math.max(min, Math.min(value, max)) / step) * step;
        }
    }
});
