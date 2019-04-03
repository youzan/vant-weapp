"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../common/component");
component_1.VantComponent({
    field: true,
    relation: {
        name: 'radio',
        type: 'descendant',
        linked: function (target) {
            var _a = this.data, value = _a.value, disabled = _a.disabled;
            target.set({
                value: value,
                disabled: disabled || target.data.disabled
            });
        }
    },
    props: {
        value: null,
        disabled: Boolean
    },
    watch: {
        value: function (value) {
            var children = this.getRelationNodes('../radio/index');
            children.forEach(function (child) {
                child.set({ value: value });
            });
        },
        disabled: function (disabled) {
            var children = this.getRelationNodes('../radio/index');
            children.forEach(function (child) {
                child.set({ disabled: disabled || child.data.disabled });
            });
        }
    }
});
