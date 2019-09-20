"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../common/component");
var utils_1 = require("../common/utils");
function emit(target, value) {
    target.$emit('input', value);
    target.$emit('change', value);
}
component_1.VantComponent({
    field: true,
    relation: {
        name: 'checkbox-group',
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
        value: Boolean,
        disabled: Boolean,
        useIconSlot: Boolean,
        checkedColor: String,
        labelPosition: String,
        labelDisabled: Boolean,
        shape: {
            type: String,
            value: 'round'
        },
        iconSize: {
            type: null,
            observer: 'setSizeWithUnit'
        }
    },
    data: {
        sizeWithUnit: '20px'
    },
    methods: {
        emitChange: function (value) {
            if (this.parent) {
                this.setParentValue(this.parent, value);
            }
            else {
                emit(this, value);
            }
        },
        toggle: function () {
            var _a = this.data, disabled = _a.disabled, value = _a.value;
            if (!disabled) {
                this.emitChange(!value);
            }
        },
        onClickLabel: function () {
            var _a = this.data, labelDisabled = _a.labelDisabled, disabled = _a.disabled, value = _a.value;
            if (!disabled && !labelDisabled) {
                this.emitChange(!value);
            }
        },
        setParentValue: function (parent, value) {
            var parentValue = parent.data.value.slice();
            var name = this.data.name;
            var max = parent.data.max;
            if (value) {
                if (max && parentValue.length >= max) {
                    return;
                }
                if (parentValue.indexOf(name) === -1) {
                    parentValue.push(name);
                    emit(parent, parentValue);
                }
            }
            else {
                var index = parentValue.indexOf(name);
                if (index !== -1) {
                    parentValue.splice(index, 1);
                    emit(parent, parentValue);
                }
            }
        },
        setSizeWithUnit: function (size) {
            this.set({
                sizeWithUnit: utils_1.addUnit(size)
            });
        },
    }
});
