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
    iconClass(): string {
      const { disabled, value, shape } = this.data;
      return this.classNames(
        'van-checkbox__icon',
        `van-checkbox__icon--${shape}`,
        {
          'van-checkbox__icon--disabled': disabled,
          'van-checkbox__icon--checked': value
        }
      );
    },

    iconStyle(): string {
      const { value, disabled, checkedColor } = this.data;
      if (checkedColor && value && !disabled) {
        return `border-color: ${checkedColor}; background-color: ${checkedColor}`;
      }
      return '';
    }
  },

  methods: {
    emitChange(value) {
      const parent = this.getRelationNodes('../checkbox-group/index')[0];
      if (parent) {
        this.setParentValue(parent, value);
      } else {
        this.$emit('input', value);
        this.$emit('change', value);
      }
    },

    toggle() {
      if (!this.data.disabled) {
        this.emitChange(!this.data.value);
      }
    },

    onClickLabel() {
      if (!this.data.disabled && !this.data.labelDisabled) {
        this.emitChange(!this.data.value);
      }
    },

    setParentValue(parent, value) {
      const parentValue = parent.data.value.slice();
      const { name } = this.data;

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
        const index = parentValue.indexOf(name);
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
