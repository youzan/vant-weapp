"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../common/component");
var utils_1 = require("../common/utils");
component_1.VantComponent({
    relation: {
        name: 'badge',
        type: 'descendant',
        linked: function (target) {
            this.badges.push(target);
            this.setActive();
        },
        unlinked: function (target) {
            this.badges = this.badges.filter(function (item) { return item !== target; });
            this.setActive();
        }
    },
    props: {
        active: {
            type: Number,
            value: 0
        }
    },
    watch: {
        active: 'setActive'
    },
    beforeCreate: function () {
        this.badges = [];
        this.currentActive = -1;
    },
    methods: {
        setActive: function (badge) {
            var active = this.data.active;
            var badges = this.badges;
            if (badge && !utils_1.isNumber(badge)) {
                active = badges.indexOf(badge);
            }
            if (active === this.currentActive) {
                return;
            }
            if (this.currentActive !== -1 && badges[this.currentActive]) {
                this.$emit('change', active);
                badges[this.currentActive].setActive(false);
            }
            if (badges[active]) {
                badges[active].setActive(true);
                this.currentActive = active;
            }
        }
    }
});
