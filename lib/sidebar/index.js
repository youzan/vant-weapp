"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../common/component");
component_1.VantComponent({
    relation: {
        name: 'sidebar-item',
        type: 'descendant',
        linked: function (target) {
            this.children.push(target);
            this.setActive(this.data.activeKey);
        },
        unlinked: function (target) {
            this.children = this.children.filter(function (item) { return item !== target; });
            this.setActive(this.data.activeKey);
        }
    },
    props: {
        activeKey: {
            type: Number,
            value: 0,
            observer: 'setActive'
        }
    },
    beforeCreate: function () {
        this.children = [];
        this.currentActive = -1;
    },
    methods: {
        setActive: function (activeKey) {
            var _a = this, children = _a.children, currentActive = _a.currentActive;
            if (!children.length) {
                return Promise.resolve();
            }
            this.currentActive = activeKey;
            var stack = [];
            if (currentActive !== activeKey && children[currentActive]) {
                stack.push(children[currentActive].setActive(false));
            }
            if (children[activeKey]) {
                stack.push(children[activeKey].setActive(true));
            }
            return Promise.all(stack);
        }
    }
});
