"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../common/component");
component_1.VantComponent({
    relation: {
        type: 'descendant',
        name: 'goods-action-button',
        linked: function (child) {
            this.children.push(child);
        },
        unlinked: function (child) {
            this.children = this.children.filter(function (item) { return item !== child; });
        }
    },
    beforeCreate: function () {
        this.children = [];
    },
    props: {
        safeAreaInsetBottom: {
            type: Boolean,
            value: true
        }
    }
});
