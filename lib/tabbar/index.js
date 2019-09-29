"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../common/component");
component_1.VantComponent({
    relation: {
        name: 'tabbar-item',
        type: 'descendant',
        linked: function (target) {
            this.children.push(target);
            target.parent = this;
            target.updateFromParent();
        },
        unlinked: function (target) {
            this.children = this.children.filter(function (item) { return item !== target; });
            this.updateChildren();
        }
    },
    props: {
        active: {
            type: null,
            observer: 'updateChildren'
        },
        activeColor: {
            type: String,
            observer: 'updateChildren'
        },
        inactiveColor: {
            type: String,
            observer: 'updateChildren'
        },
        fixed: {
            type: Boolean,
            value: true
        },
        border: {
            type: Boolean,
            value: true
        },
        zIndex: {
            type: Number,
            value: 1
        },
        safeAreaInsetBottom: {
            type: Boolean,
            value: true
        }
    },
    beforeCreate: function () {
        this.children = [];
    },
    methods: {
        updateChildren: function () {
            var children = this.children;
            if (!Array.isArray(children) || !children.length) {
                return Promise.resolve();
            }
            return Promise.all(children.map(function (child) { return child.updateFromParent(); }));
        },
        onChange: function (child) {
            var index = this.children.indexOf(child);
            var active = child.data.name || index;
            if (active !== this.data.active) {
                this.$emit('change', active);
            }
        }
    }
});
