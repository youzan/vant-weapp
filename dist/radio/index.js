import { VantComponent } from '../common/component';
import { useParent } from '../common/relation';
VantComponent({
  field: true,
  relation: useParent('radio-group'),
  classes: ['icon-class', 'label-class'],
  props: {
    name: null,
    value: null,
    disabled: Boolean,
    useIconSlot: Boolean,
    checkedColor: String,
    labelPosition: {
      type: String,
      value: 'right',
    },
    labelDisabled: Boolean,
    shape: {
      type: String,
      value: 'round',
    },
    iconSize: {
      type: null,
      value: 20,
    },
  },
  methods: {
    emitChange(value) {
      const instance = this.parent || this;
      instance.$emit('input', value);
      instance.$emit('change', value);
    },
    onChange() {
      if (!this.data.disabled) {
        this.emitChange(this.data.name);
      }
    },
    onClickLabel() {
      const { disabled, labelDisabled, name } = this.data;
      if (!disabled && !labelDisabled) {
        this.emitChange(name);
      }
    },
  },
});
