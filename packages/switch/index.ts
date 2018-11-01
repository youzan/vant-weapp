import { VantComponent } from '../common/component';

VantComponent({
  field: true,

  classes: ['node-class'],

  props: {
    checked: Boolean,
    loading: Boolean,
    disabled: Boolean,
    activeColor: String,
    inactiveColor: String,
    size: {
      type: String,
      value: '30px'
    }
  },

  watch: {
    checked(value) {
      this.setData({ value });
    }
  },

  computed: {
    classes(): string {
      return this.classNames('custom-class', 'van-switch', {
        'van-switch--on': this.data.checked,
        'van-switch--disabled': this.data.disabled
      });
    },

    style() {
      const backgroundColor = this.data.checked ? this.data.activeColor : this.data.inactiveColor;
      return `font-size: ${this.data.size}; ${ backgroundColor ? `background-color: ${backgroundColor}` : '' }`
    }
  },

  created() {
    this.setData({ value: this.data.checked });
  },

  methods: {
    onClick() {
      if (!this.data.disabled && !this.data.loading) {
        const checked = !this.data.checked;
        this.$emit('input', checked);
        this.$emit('change', checked);
      }
    }
  }
});
