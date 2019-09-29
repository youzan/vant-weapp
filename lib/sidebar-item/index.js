"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../common/component");
component_1.VantComponent({
    relation: {
        type: 'ancestor',
        name: 'sidebar',
        linked: function (target) {
            this.parent = target;
        }
    },
    props: {
        dot: Boolean,
        info: null,
        title: String
    },
    methods: {
        onClick: function () {
            var _this = this;
            var parent = this.parent;
            if (!parent) {
                return;
            }
            var index = parent.items.indexOf(this);
            parent.setActive(index).then(function () {
                _this.$emit('click', index);
                parent.$emit('change', index);
            });
        },
        setActive: function (active) {
            return this.setData({ active: active });
        }
    }
});
