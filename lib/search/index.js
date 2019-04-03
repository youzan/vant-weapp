"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../common/component");
component_1.VantComponent({
    field: true,
    classes: ['field-class', 'input-class', 'cancel-class'],
    props: {
        focus: Boolean,
        error: Boolean,
        disabled: Boolean,
        readonly: Boolean,
        inputAlign: String,
        showAction: Boolean,
        useActionSlot: Boolean,
        placeholder: String,
        placeholderStyle: String,
        background: {
            type: String,
            value: '#ffffff'
        },
        maxlength: {
            type: Number,
            value: -1
        },
        shape: {
            type: String,
            value: 'square'
        },
        label: String
    },
    methods: {
        onChange: function (event) {
            this.set({ value: event.detail });
            this.$emit('change', event.detail);
        },
        onCancel: function () {
            this.set({ value: '' });
            this.$emit('cancel');
            this.$emit('change', '');
        },
        onSearch: function () {
            this.$emit('search', this.data.value);
        },
        onFocus: function () {
            this.$emit('focus');
        },
        onBlur: function () {
            this.$emit('blur');
        },
        onClear: function () {
            this.$emit('clear');
        },
    }
});
