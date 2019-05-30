"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../common/component");
component_1.VantComponent({
    field: true,
    relation: {
        name: 'checkbox',
        type: 'descendant',
        linked: function (target) {
            this.children = this.children || [];
            this.children.push(target);
            this.updateChild(target);
        },
        unlinked: function (target) {
            this.children = this.children.filter(function (child) { return child !== target; });
        }
    },
    props: {
        max: Number,
        value: {
            type: Array,
            observer: 'updateChildren'
        },
        disabled: {
            type: Boolean,
            observer: 'updateChildren'
        }
    },
    methods: {
        updateChildren: function () {
            var _this = this;
            (this.children || []).forEach(function (child) {
                return _this.updateChild(child);
            });
        },
        updateChild: function (child) {
            var _a = this.data, value = _a.value, disabled = _a.disabled;
            child.set({
                value: value.indexOf(child.data.name) !== -1,
                disabled: disabled || child.data.disabled
            });
        }
    }
});
