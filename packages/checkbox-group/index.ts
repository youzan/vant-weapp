import { VantComponent } from '../common/component';

VantComponent({
  field: true,

  relation: {
    name: 'checkbox',
    type: 'descendant',
    linked(target: Weapp.Component) {
      const { value, disabled } = this.data;
      target.setData({
        value: value.indexOf(target.data.name) !== -1,
        disabled: disabled || target.data.disabled
      });
    }
  },

  props: {
    value: Array,
    disabled: Boolean,
    max: Number
  },

  watch: {
    value(value) {
      const children = this.getRelationNodes('../checkbox/index');
      children.forEach(child => {
        child.setData({ value: value.indexOf(child.data.name) !== -1 });
      });
    },

    disabled(disabled: boolean) {
      const children = this.getRelationNodes('../checkbox/index');
      children.forEach(child => {
        child.setData({ disabled: disabled || child.data.disabled });
      });
    }
  }
});
