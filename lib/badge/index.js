"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../common/component");
component_1.VantComponent({
    relation: {
        type: 'ancestor',
        name: 'badge-group'
    },
    props: {
        info: null,
        title: String
    },
    methods: {
        onClick: function () {
            var group = this.getRelationNodes('../badge-group/index')[0];
            if (group) {
                group.setActive(this);
            }
        },
        setActive: function (active) {
            this.set({ active: active });
        }
    }
});
