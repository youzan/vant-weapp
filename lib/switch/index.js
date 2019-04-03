"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../common/component");
component_1.VantComponent({
    field: true,
    classes: ['node-class'],
    props: {
        checked: null,
        loading: Boolean,
        disabled: Boolean,
        activeColor: String,
        inactiveColor: String,
        size: {
            type: String,
            value: '30px'
        },
        activeValue: {
            type: null,
            value: true
        },
        inactiveValue: {
            type: null,
            value: false
        }
    },
    watch: {
        checked: function (value) {
            this.set({ value: value });
        }
    },
    created: function () {
        this.set({ value: this.data.checked });
    },
    methods: {
        onClick: function () {
            var _a = this.data, activeValue = _a.activeValue, inactiveValue = _a.inactiveValue;
            if (!this.data.disabled && !this.data.loading) {
                var checked = this.data.checked === activeValue;
                var value = checked ? inactiveValue : activeValue;
                this.$emit('input', value);
                this.$emit('change', value);
            }
        }
    }
});
