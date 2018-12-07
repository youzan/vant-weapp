import { VantComponent } from '../common/component';
VantComponent({
  field: true,
  relation: {
    name: 'radio',
    type: 'descendant',
    linked: function linked(target) {
      var _this$data = this.data,
          value = _this$data.value,
          disabled = _this$data.disabled;
      target.set({
        value: value,
        disabled: disabled || target.data.disabled
      });
    }
  },
  props: {
    value: null,
    disabled: Boolean
  },
  watch: {
    value: function value(_value) {
      var children = this.getRelationNodes('../radio/index');
      children.forEach(function (child) {
        child.set({
          value: _value
        });
      });
    },
    disabled: function disabled(_disabled) {
      var children = this.getRelationNodes('../radio/index');
      children.forEach(function (child) {
        child.set({
          disabled: _disabled || child.data.disabled
        });
      });
    }
  }
});