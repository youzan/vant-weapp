"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../common/component");
component_1.VantComponent({
    relation: {
        type: 'ancestor',
        name: 'badge-group',
        linked: function (target) {
            this.parent = target;
        }
    },
    props: {
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
            var index = parent.badges.indexOf(this);
            parent.setActive(index).then(function () {
                _this.$emit('click', index);
                parent.$emit('change', index);
            });
        },
        setActive: function (active) {
            return this.set({ active: active });
        }
    }
});
