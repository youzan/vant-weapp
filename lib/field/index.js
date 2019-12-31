"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../common/component");
var utils_1 = require("../common/utils");
component_1.VantComponent({
    field: true,
    classes: ['input-class', 'right-icon-class'],
    props: {
        size: String,
        icon: String,
        label: String,
        error: Boolean,
        fixed: Boolean,
        focus: Boolean,
        center: Boolean,
        isLink: Boolean,
        leftIcon: String,
        rightIcon: String,
        disabled: Boolean,
        autosize: Boolean,
        readonly: Boolean,
        required: Boolean,
        password: Boolean,
        iconClass: String,
        clearable: Boolean,
        clickable: Boolean,
        inputAlign: String,
        placeholder: String,
        customStyle: String,
        confirmType: String,
        confirmHold: Boolean,
        holdKeyboard: Boolean,
        errorMessage: String,
        arrowDirection: String,
        placeholderStyle: String,
        errorMessageAlign: String,
        selectionEnd: {
            type: Number,
            value: -1
        },
        selectionStart: {
            type: Number,
            value: -1
        },
        showConfirmBar: {
            type: Boolean,
            value: true
        },
        adjustPosition: {
            type: Boolean,
            value: true
        },
        cursorSpacing: {
            type: Number,
            value: 50
        },
        maxlength: {
            type: Number,
            value: -1
        },
        type: {
            type: String,
            value: 'text'
        },
        border: {
            type: Boolean,
            value: true
        },
        titleWidth: {
            type: String,
            value: '90px'
        }
    },
    data: {
        focused: false,
        system: utils_1.getSystemInfoSync().system.split(' ').shift().toLowerCase()
    },
    methods: {
        onInput: function (event) {
            var _this = this;
            var _a = (event.detail || {}).value, value = _a === void 0 ? '' : _a;
            this.setData({ value: value });
            wx.nextTick(function () {
                _this.emitChange(value);
            });
        },
        onFocus: function (event) {
            this.setData({ focused: true });
            this.$emit('focus', event.detail);
        },
        onBlur: function (event) {
            this.setData({ focused: false });
            this.$emit('blur', event.detail);
        },
        onClickIcon: function () {
            this.$emit('click-icon');
        },
        onClear: function () {
            var _this = this;
            this.setData({ value: '' });
            wx.nextTick(function () {
                _this.emitChange('');
                _this.$emit('clear', '');
            });
        },
        onConfirm: function () {
            this.$emit('confirm', this.data.value);
        },
        emitChange: function (value) {
            this.$emit('input', value);
            this.$emit('change', value);
        },
        noop: function () { }
    }
});
