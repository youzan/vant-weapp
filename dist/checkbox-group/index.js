import { useChildren } from '../common/relation';
import { VantComponent } from '../common/component';
VantComponent({
  field: true,
  relation: useChildren('checkbox', function (target) {
    this.updateChild(target);
  }),
  props: {
    max: Number,
    value: {
      type: Array,
      observer: 'updateChildren',
    },
    disabled: {
      type: Boolean,
      observer: 'updateChildren',
    },
    direction: {
      type: String,
      value: 'vertical',
    },
  },
  methods: {
    updateChildren() {
      this.children.forEach((child) => this.updateChild(child));
    },
    updateChild(child) {
      const { value, disabled, direction } = this.data;
      child.setData({
        value: value.indexOf(child.data.name) !== -1,
        parentDisabled: disabled,
        direction,
      });
    },
  },
});
