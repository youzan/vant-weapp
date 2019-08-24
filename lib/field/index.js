"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../common/component");
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
        inputAlign: String,
        customStyle: String,
        confirmType: String,
        confirmHold: Boolean,
        errorMessage: String,
        placeholder: String,
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
        showClear: false
    },
    beforeCreate: function () {
        this.focused = false;
    },
    methods: {
        onInput: function (event) {
            var _this = this;
            var _a = (event.detail || {}).value, value = _a === void 0 ? '' : _a;
            this.set({
                value: value,
                showClear: this.getShowClear(value)
            }, function () {
                _this.emitChange(value);
            });
        },
        onFocus: function (event) {
            var _a = event.detail || {}, _b = _a.value, value = _b === void 0 ? '' : _b, _c = _a.height, height = _c === void 0 ? 0 : _c;
            this.$emit('focus', { value: value, height: height });
            this.focused = true;
            this.blurFromClear = false;
            this.set({
                showClear: this.getShowClear()
            });
        },
        onBlur: function (event) {
            var _this = this;
            var _a = event.detail || {}, _b = _a.value, value = _b === void 0 ? '' : _b, _c = _a.cursor, cursor = _c === void 0 ? 0 : _c;
            this.$emit('blur', { value: value, cursor: cursor });
            this.focused = false;
            var showClear = this.getShowClear();
            if (this.data.value === value) {
                this.set({
                    showClear: showClear
                });
            }
            else if (!this.blurFromClear) {
                // fix: the handwritten keyboard does not trigger input change
                this.set({
                    value: value,
                    showClear: showClear
                }, function () {
                    _this.emitChange(value);
                });
            }
        },
        onClickIcon: function () {
            this.$emit('click-icon');
        },
        getShowClear: function (value) {
            value = value === undefined ? this.data.value : value;
            return (this.data.clearable && this.focused && value && !this.data.readonly);
        },
        onClear: function () {
            var _this = this;
            this.blurFromClear = true;
            this.set({
                value: '',
                showClear: this.getShowClear('')
            }, function () {
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
        }
    }
});
