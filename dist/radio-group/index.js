import { VantComponent } from '../common/component';
VantComponent({
  field: true,
  relation: {
    name: 'radio',
    type: 'descendant',
    current: 'radio-group',
    linked(target) {
      this.updateChild(target);
    },
  },
  props: {
    value: {
      type: null,
      observer: 'updateChildren',
    },
    disabled: {
      type: Boolean,
      observer: 'updateChildren',
    },
  },
  methods: {
    updateChildren() {
      (this.children || []).forEach((child) => this.updateChild(child));
    },
    updateChild(child) {
      const { value, disabled } = this.data;
      child.setData({
        value,
        disabled: disabled || child.data.disabled,
      });
    },
  },
});
