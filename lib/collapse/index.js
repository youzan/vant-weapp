"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../common/component");
component_1.VantComponent({
    relation: {
        name: 'collapse-item',
        type: 'descendant',
        linked: function (child) {
            this.set({
                items: this.data.items.concat([child])
            }, function () {
                child.updateExpanded();
            });
        }
    },
    props: {
        value: null,
        accordion: Boolean,
        border: {
            type: Boolean,
            value: true
        }
    },
    data: {
        items: []
    },
    watch: {
        value: function () {
            this.data.items.forEach(function (child) {
                child.updateExpanded();
            });
        },
        accordion: function () {
            this.data.items.forEach(function (child) {
                child.updateExpanded();
            });
        }
    },
    methods: {
        switch: function (name, expanded) {
            var _a = this.data, accordion = _a.accordion, value = _a.value;
            if (!accordion) {
                name = expanded
                    ? value.concat(name)
                    : value.filter(function (activeName) { return activeName !== name; });
            }
            else {
                name = expanded ? name : '';
            }
            this.$emit('change', name);
            this.$emit('input', name);
        }
    }
});
