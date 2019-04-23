"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../common/component");
component_1.VantComponent({
    field: true,
    relation: {
        name: 'checkbox-group',
        type: 'ancestor'
    },
    classes: ['icon-class', 'label-class'],
    props: {
        value: null,
        disabled: Boolean,
        useIconSlot: Boolean,
        checkedColor: String,
        labelPosition: String,
        labelDisabled: Boolean,
        shape: {
            type: String,
            value: 'round'
        }
    },
    methods: {
        emitChange: function (value) {
            var parent = this.getRelationNodes('../checkbox-group/index')[0];
            if (parent) {
                this.setParentValue(parent, value);
            }
            else {
                this.$emit('input', value);
                this.$emit('change', value);
            }
        },
        toggle: function () {
            if (!this.data.disabled) {
                this.emitChange(!this.data.value);
            }
        },
        onClickLabel: function () {
            if (!this.data.disabled && !this.data.labelDisabled) {
                this.emitChange(!this.data.value);
            }
        },
        setParentValue: function (parent, value) {
            var parentValue = parent.data.value.slice();
            var name = this.data.name;
            if (value) {
                if (parent.data.max && parentValue.length >= parent.data.max) {
                    return;
                }
                /* istanbul ignore else */
                if (parentValue.indexOf(name) === -1) {
                    parentValue.push(name);
                    parent.$emit('input', parentValue);
                    parent.$emit('change', parentValue);
                }
            }
            else {
                var index = parentValue.indexOf(name);
                /* istanbul ignore else */
                if (index !== -1) {
                    parentValue.splice(index, 1);
                    parent.$emit('input', parentValue);
                    parent.$emit('change', parentValue);
                }
            }
        }
    }
});
