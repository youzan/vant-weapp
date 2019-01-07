import { VantComponent } from '../common/component';
VantComponent({
  field: true,
  relation: {
    name: 'checkbox',
    type: 'descendant',
    linked: function linked(target) {
      var _this$data = this.data,
          value = _this$data.value,
          disabled = _this$data.disabled;
      target.set({
        value: value.indexOf(target.data.name) !== -1,
        disabled: disabled || target.data.disabled
      });
    }
  },
  props: {
    max: Number,
    value: Array,
    disabled: Boolean
  },
  watch: {
    value: function value(_value) {
      var children = this.getRelationNodes('../checkbox/index');
      children.forEach(function (child) {
        child.set({
          value: _value.indexOf(child.data.name) !== -1
        });
      });
    },
    disabled: function disabled(_disabled) {
      var children = this.getRelationNodes('../checkbox/index');
      children.forEach(function (child) {
        child.set({
          disabled: _disabled || child.data.disabled
        });
      });
    }
  }
});