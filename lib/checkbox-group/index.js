"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../common/component");
component_1.VantComponent({
    field: true,
    relation: {
        name: 'checkbox',
        type: 'descendant',
        linked: function (target) {
            var _a = this.data, value = _a.value, disabled = _a.disabled;
            target.set({
                value: value.indexOf(target.data.name) !== -1,
                disabled: disabled || target.data.disabled
            });
        }
    },
    props: {
        max: Number,
        value: Array,
        disabled: Boolean
    },
    watch: {
        value: function (value) {
            var children = this.getRelationNodes('../checkbox/index');
            children.forEach(function (child) {
                child.set({ value: value.indexOf(child.data.name) !== -1 });
            });
        },
        disabled: function (disabled) {
            var children = this.getRelationNodes('../checkbox/index');
            children.forEach(function (child) {
                child.set({ disabled: disabled || child.data.disabled });
            });
        }
    }
});
