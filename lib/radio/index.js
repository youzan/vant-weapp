"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../common/component");
component_1.VantComponent({
    field: true,
    relation: {
        name: 'radio-group',
        type: 'ancestor'
    },
    classes: ['icon-class', 'label-class'],
    props: {
        name: null,
        value: null,
        disabled: Boolean,
        labelDisabled: Boolean,
        labelPosition: String,
        checkedColor: String
    },
    methods: {
        emitChange: function (value) {
            var instance = this.getRelationNodes('../radio-group/index')[0] || this;
            instance.$emit('input', value);
            instance.$emit('change', value);
        },
        onChange: function (event) {
            this.emitChange(event.detail.value);
        },
        onClickLabel: function () {
            if (!this.data.disabled && !this.data.labelDisabled) {
                this.emitChange(this.data.name);
            }
        }
    }
});
