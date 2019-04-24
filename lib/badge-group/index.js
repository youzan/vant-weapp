"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../common/component");
component_1.VantComponent({
    relation: {
        name: 'badge',
        type: 'descendant',
        linked: function (target) {
            this.badges.push(target);
            this.setActive(this.data.active);
        },
        unlinked: function (target) {
            this.badges = this.badges.filter(function (item) { return item !== target; });
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
        this.badges = [];
        this.currentActive = -1;
    },
    methods: {
        setActive: function (active) {
            var _a = this, badges = _a.badges, currentActive = _a.currentActive;
            if (!badges.length) {
                return Promise.resolve();
            }
            this.currentActive = active;
            var stack = [];
            if (currentActive !== active && badges[currentActive]) {
                stack.push(badges[currentActive].setActive(false));
            }
            if (badges[active]) {
                stack.push(badges[active].setActive(true));
            }
            return Promise.all(stack);
        }
    }
});
