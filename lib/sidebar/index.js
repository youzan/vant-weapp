"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../common/component");
component_1.VantComponent({
    relation: {
        name: 'sidebar-item',
        type: 'descendant',
        linked: function (target) {
            this.items.push(target);
            this.setActive(this.data.active);
        },
        unlinked: function (target) {
            this.items = this.items.filter(function (item) { return item !== target; });
            this.setActive(this.data.active);
        }
    },
    props: {
        active: {
            type: Number,
            value: 0,
            observer: 'setActive'
        }
    },
    beforeCreate: function () {
        this.items = [];
        this.currentActive = -1;
    },
    methods: {
        setActive: function (active) {
            var _a = this, items = _a.items, currentActive = _a.currentActive;
            if (!items.length) {
                return Promise.resolve();
            }
            this.currentActive = active;
            var stack = [];
            if (currentActive !== active && items[currentActive]) {
                stack.push(items[currentActive].setActive(false));
            }
            if (items[active]) {
                stack.push(items[active].setActive(true));
            }
            return Promise.all(stack);
        }
    }
});
