"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../common/component");
component_1.VantComponent({
    field: true,
    relation: {
        name: 'radio',
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
        value: {
            type: null,
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
            child.setData({
                value: value,
                disabled: disabled || child.data.disabled
            });
        }
    }
});
