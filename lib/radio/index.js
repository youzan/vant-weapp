"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../common/component");
component_1.VantComponent({
    field: true,
    relation: {
        name: 'radio-group',
        type: 'ancestor',
        linked: function (target) {
            this.parent = target;
        },
        unlinked: function () {
            this.parent = null;
        }
    },
    classes: ['icon-class', 'label-class'],
    props: {
        value: null,
        disabled: Boolean,
        useIconSlot: Boolean,
        checkedColor: String,
        labelPosition: {
            type: String,
            value: 'right'
        },
        labelDisabled: Boolean,
        shape: {
            type: String,
            value: 'round'
        }
    },
    methods: {
        emitChange: function (value) {
            var instance = this.parent || this;
            instance.$emit('input', value);
            instance.$emit('change', value);
        },
        onChange: function (event) {
            console.log(event);
            this.emitChange(this.data.name);
        },
        onClickLabel: function () {
            var _a = this.data, disabled = _a.disabled, labelDisabled = _a.labelDisabled, name = _a.name;
            if (!disabled && !labelDisabled) {
                this.emitChange(name);
            }
        }
    }
});
