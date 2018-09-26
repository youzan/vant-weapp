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
    value: null,
    disabled: Boolean
  },

  watch: {
    value(value) {
      const children = this.getRelationNodes('../radio/index');
      children.forEach(child => {
        child.setData({ value });
      });
    },

    disabled(disabled) {
      const children = this.getRelationNodes('../radio/index');
      children.forEach(child => {
        child.setData({ disabled: disabled || child.data.disabled });
      });
    }
  }
});
