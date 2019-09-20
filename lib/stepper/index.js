"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../common/component");
var utils_1 = require("../common/utils");
var LONG_PRESS_START_TIME = 600;
var LONG_PRESS_INTERVAL = 200;
component_1.VantComponent({
    field: true,
    classes: ['input-class', 'plus-class', 'minus-class'],
    props: {
        value: null,
        integer: Boolean,
        disabled: Boolean,
        inputWidth: null,
        buttonSize: null,
        asyncChange: Boolean,
        disableInput: Boolean,
        min: {
            type: null,
            value: 1
        },
        max: {
            type: null,
            value: Number.MAX_SAFE_INTEGER
        },
        step: {
            type: null,
            value: 1
        },
        showPlus: {
            type: Boolean,
            value: true
        },
        showMinus: {
            type: Boolean,
            value: true
        }
    },
    watch: {
        value: function (value) {
            if (value === '') {
                return;
            }
            var newValue = this.range(value);
            if (typeof newValue === 'number' && +this.data.value !== newValue) {
                this.setData({ value: newValue });
            }
        },
        inputWidth: function () {
            this.set({
                inputStyle: this.computeInputStyle()
            });
        },
        buttonSize: function () {
            this.set({
                inputStyle: this.computeInputStyle(),
                buttonStyle: this.computeButtonStyle()
            });
        }
    },
    data: {
        focus: false,
        inputStyle: '',
        buttonStyle: ''
    },
    created: function () {
        this.setData({
            value: this.range(this.data.value)
        });
    },
    methods: {
        isDisabled: function (type) {
            if (type === 'plus') {
                return this.data.disabled || this.data.value >= this.data.max;
            }
            return this.data.disabled || this.data.value <= this.data.min;
        },
        onFocus: function (event) {
            this.$emit('focus', event.detail);
        },
        onBlur: function (event) {
            var value = this.range(this.data.value);
            this.triggerInput(value);
            this.$emit('blur', event.detail);
        },
        // limit value range
        range: function (value) {
            value = String(value).replace(/[^0-9.-]/g, '');
            return Math.max(Math.min(this.data.max, value), this.data.min);
        },
        onInput: function (event) {
            var _a = (event.detail || {}).value, value = _a === void 0 ? '' : _a;
            this.triggerInput(value);
        },
        onChange: function () {
            var type = this.type;
            if (this.isDisabled(type)) {
                this.$emit('overlimit', type);
                return;
            }
            var diff = type === 'minus' ? -this.data.step : +this.data.step;
            var value = Math.round((+this.data.value + diff) * 100) / 100;
            this.triggerInput(this.range(value));
            this.$emit(type);
        },
        longPressStep: function () {
            var _this = this;
            this.longPressTimer = setTimeout(function () {
                _this.onChange();
                _this.longPressStep();
            }, LONG_PRESS_INTERVAL);
        },
        onTap: function (event) {
            var type = event.currentTarget.dataset.type;
            this.type = type;
            this.onChange();
        },
        onTouchStart: function (event) {
            var _this = this;
            clearTimeout(this.longPressTimer);
            var type = event.currentTarget.dataset.type;
            this.type = type;
            this.isLongPress = false;
            this.longPressTimer = setTimeout(function () {
                _this.isLongPress = true;
                _this.onChange();
                _this.longPressStep();
            }, LONG_PRESS_START_TIME);
        },
        onTouchEnd: function () {
            clearTimeout(this.longPressTimer);
        },
        triggerInput: function (value) {
            this.setData({
                value: this.data.asyncChange ? this.data.value : value
            });
            this.$emit('change', value);
        },
        computeInputStyle: function () {
            var style = '';
            if (this.data.inputWidth) {
                style = "width: " + utils_1.addUnit(this.data.inputWidth) + ";";
            }
            if (this.data.buttonSize) {
                style += "height: " + utils_1.addUnit(this.data.buttonSize) + ";";
            }
            return style;
        },
        computeButtonStyle: function () {
            var style = '';
            var size = utils_1.addUnit(this.data.buttonSize);
            if (this.data.buttonSize) {
                style = "width: " + size + ";height: " + size + ";";
            }
            return style;
        }
    }
});
