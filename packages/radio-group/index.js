import { VantComponent } from '../common/component';

VantComponent({
  relations: {
    '../radio/index': {
      type: 'descendant',
      linked(target) {
        const { value, disabled } = this.data;
        target.setData({
          value: value,
          disabled: disabled || target.data.disabled
        });
      }
    }
  },

  props: {
    value: {
      type: null,
      observer(value) {
        const children = this.getRelationNodes('../radio/index');
        children.forEach(child => {
          child.setData({ value });
        });
      }
    },
    disabled: {
      type: Boolean,
      observer(disabled) {
        const children = this.getRelationNodes('../radio/index');
        children.forEach(child => {
          child.setData({ disabled: disabled || children.data.disabled });
        });
      }
    }
  }
});
