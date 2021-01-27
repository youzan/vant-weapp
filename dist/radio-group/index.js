import { VantComponent } from '../common/component';
import { useChildren } from '../common/relation';
VantComponent({
  field: true,
  relation: useChildren('radio', function (target) {
    this.updateChild(target);
  }),
  props: {
    value: {
      type: null,
      observer: 'updateChildren',
    },
    direction: String,
    disabled: {
      type: Boolean,
      observer: 'updateChildren',
    },
  },
  methods: {
    updateChildren() {
      this.children.forEach((child) => this.updateChild(child));
    },
    updateChild(child) {
      const { value, disabled, direction } = this.data;
      child.setData({
        value,
        direction,
        disabled: disabled || child.data.disabled,
      });
    },
  },
});
