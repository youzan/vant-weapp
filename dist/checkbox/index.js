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
    useIconSlot: Boolean,
    checkedColor: String,
    labelPosition: String,
    labelDisabled: Boolean,
    shape: {
      type: String,
      value: 'round'
    }
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
    },
    iconStyle: function iconStyle() {
      var _this$data2 = this.data,
          value = _this$data2.value,
          disabled = _this$data2.disabled,
          checkedColor = _this$data2.checkedColor;

      if (checkedColor && value && !disabled) {
        return "border-color: " + checkedColor + "; background-color: " + checkedColor;
      }

      return '';
    }
  },
  methods: {
    emitChange: function emitChange(value) {
      var parent = this.getRelationNodes('../checkbox-group/index')[0];

      if (parent) {
        this.setParentValue(parent, value);
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
    },
    setParentValue: function setParentValue(parent, value) {
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
    }
  }
});