import { VantComponent } from '../common/component';
VantComponent({
  field: true,
  relation: {
    name: 'checkbox-group',
    type: 'ancestor'
  },
  classes: ['icon-class', 'label-class'],
  props: {
    value: null,
    disabled: Boolean,
    labelDisabled: Boolean,
    labelPosition: String,
    shape: {
      type: String,
      value: 'round'
    },
    useIconSlot: Boolean
  },
  computed: {
    iconClass: function iconClass() {
      var _this$data = this.data,
          disabled = _this$data.disabled,
          value = _this$data.value,
          shape = _this$data.shape;
      return this.classNames('van-checkbox__icon', "van-checkbox__icon--" + shape, {
        'van-checkbox__icon--disabled': disabled,
        'van-checkbox__icon--checked': value
      });
    }
  },
  methods: {
    emitChange: function emitChange(value) {
      var parent = this.getRelationNodes('../checkbox-group/index')[0];

      if (parent) {
        var parentValue = parent.data.value.slice();
        var name = this.data.name;

        if (value) {
          if (parent.data.max && parentValue.length >= parent.data.max) {
            return;
          }
          /* istanbul ignore else */


          if (parentValue.indexOf(name) === -1) {
            parentValue.push(name);
            parent.$emit('input', parentValue);
            parent.$emit('change', parentValue);
          }
        } else {
          var index = parentValue.indexOf(name);
          /* istanbul ignore else */

          if (index !== -1) {
            parentValue.splice(index, 1);
            parent.$emit('input', parentValue);
            parent.$emit('change', parentValue);
          }
        }
      } else {
        this.$emit('input', value);
        this.$emit('change', value);
      }
    },
    toggle: function toggle() {
      if (!this.data.disabled) {
        this.emitChange(!this.data.value);
      }
    },
    onClickLabel: function onClickLabel() {
      if (!this.data.disabled && !this.data.labelDisabled) {
        this.emitChange(!this.data.value);
      }
    }
  }
});