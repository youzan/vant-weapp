"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../common/component");
component_1.VantComponent({
    field: true,
    props: {
        value: null,
        icon: String,
        title: String,
        label: String,
        border: Boolean,
        checked: Boolean,
        loading: Boolean,
        disabled: Boolean,
        activeColor: String,
        inactiveColor: String,
        useLabelSlot: Boolean,
        size: {
            type: String,
            value: '24px'
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
        onChange: function (event) {
            this.$emit('change', event.detail);
        }
    }
});
