"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../common/component");
component_1.VantComponent({
    props: {
        info: null,
        icon: String,
        dot: Boolean
    },
    relation: {
        name: 'tabbar',
        type: 'ancestor',
        linked: function (target) {
            this.parent = target;
        }
    },
    data: {
        active: false
    },
    methods: {
        onClick: function () {
            if (this.parent) {
                this.parent.onChange(this);
            }
            this.$emit('click');
        },
        setActive: function (_a) {
            var active = _a.active, color = _a.color;
            if (this.data.active !== active) {
                return this.set({ active: active, color: color });
            }
            return Promise.resolve();
        }
    }
});
