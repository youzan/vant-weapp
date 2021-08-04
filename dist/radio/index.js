import { canIUseModel } from '../common/version';
import { VantComponent } from '../common/component';
import { useParent } from '../common/relation';
VantComponent({
  field: true,
  relation: useParent('radio-group', function () {
    this.updateFromParent();
  }),
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
  data: {
    direction: '',
    parentDisabled: false,
  },
  methods: {
    updateFromParent() {
      if (!this.parent) {
        return;
      }
      const { value, disabled: parentDisabled, direction } = this.parent.data;
      this.setData({
        value,
        direction,
        parentDisabled,
      });
    },
    emitChange(value) {
      const instance = this.parent || this;
      instance.$emit('input', value);
      instance.$emit('change', value);
      if (canIUseModel()) {
        instance.setData({ value });
      }
    },
    onChange() {
      if (!this.data.disabled && !this.data.parentDisabled) {
        this.emitChange(this.data.name);
      }
    },
    onClickLabel() {
      const { disabled, parentDisabled, labelDisabled, name } = this.data;
      if (!(disabled || parentDisabled) && !labelDisabled) {
        this.emitChange(name);
      }
    },
  },
});
