import { VantComponent } from '../common/component';
import { Weapp } from 'definitions/weapp';
import { addUnit } from '../common/utils';

VantComponent({
  field: true,

  relation: {
    name: 'radio-group',
    type: 'ancestor',
    linked(target) {
      this.parent = target;
    },
    unlinked() {
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
    },
    iconSize: {
      type: null,
      observer: 'setIconSizeUnit'
    }
  },

  data: {
    iconSizeWithUnit: '20px'
  },

  methods: {
    setIconSizeUnit(val) {
      this.setData({
        iconSizeWithUnit: addUnit(val)
      });
    },

    emitChange(value: boolean) {
      const instance = this.parent || this;
      instance.$emit('input', value);
      instance.$emit('change', value);
    },

    onChange(event: Weapp.Event) {
      console.log(event);
      this.emitChange(this.data.name);
    },

    onClickLabel() {
      const { disabled, labelDisabled, name } = this.data;
      if (!disabled && !labelDisabled) {
        this.emitChange(name);
      }
    }
  }
});
