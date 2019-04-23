"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../common/component");
var safe_area_1 = require("../mixins/safe-area");
component_1.VantComponent({
    mixins: [safe_area_1.safeArea()],
    relation: {
        name: 'tabbar-item',
        type: 'descendant',
        linked: function (target) {
            this.children = this.children || [];
            this.children.push(target);
            this.setActiveItem();
        },
        unlinked: function (target) {
            this.children = this.children || [];
            this.children = this.children.filter(function (item) { return item !== target; });
            this.setActiveItem();
        }
    },
    props: {
        active: Number,
        activeColor: String,
        fixed: {
            type: Boolean,
            value: true
        },
        zIndex: {
            type: Number,
            value: 1
        }
    },
    watch: {
        active: function (active) {
            this.currentActive = active;
            this.setActiveItem();
        }
    },
    created: function () {
        this.currentActive = this.data.active;
    },
    methods: {
        setActiveItem: function () {
            var _this = this;
            if (!Array.isArray(this.children) || !this.children.length) {
                return Promise.resolve();
            }
            return Promise.all(this.children.map(function (item, index) {
                return item.setActive({
                    active: index === _this.currentActive,
                    color: _this.data.activeColor
                });
            }));
        },
        onChange: function (child) {
            var _this = this;
            var active = (this.children || []).indexOf(child);
            if (active !== this.currentActive && active !== -1) {
                this.currentActive = active;
                this.setActiveItem().then(function () {
                    _this.$emit('change', active);
                });
            }
        }
    }
});
