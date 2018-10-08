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
    iconClass(): string {
      const { disabled, value, shape } = this.data;
      return this.classNames('van-checkbox__icon', `van-checkbox__icon--${shape}`, {
        'van-checkbox__icon--disabled': disabled,
        'van-checkbox__icon--checked': value
      });
    }
  },

  methods: {
    emitChange(value) {
      const parent = this.getRelationNodes('../checkbox-group/index')[0];
      if (parent) {
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
    }
  }
});
