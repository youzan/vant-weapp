import { create } from '../common/create';
import { classNames } from '../common/class-names';
import { button } from '../mixins/button';

const booleanProp = {
  type: Boolean,
  observer: 'setClasses'
};

create({
  mixins: [button],

  props: {
    type: {
      type: String,
      value: 'default',
      observer: 'setClasses'
    },
    size: {
      type: String,
      value: 'normal',
      observer: 'setClasses'
    },
    plain: booleanProp,
    block: booleanProp,
    square: booleanProp,
    loading: booleanProp,
    disabled: booleanProp
  },

  attached() {
    this.setClasses();
  },

  methods: {
    onClick() {
      if (!this.data.disabled && !this.data.loading) {
        this.$emit('click');
      }
    },

    setClasses() {
      const { type, size, plain, disabled, loading, square, block } = this.data;
      this.setData({
        classes: classNames(`van-button--${type}`, `van-button--${size}`, {
          'van-button--block': block,
          'van-button--plain': plain,
          'van-button--square': square,
          'van-button--loading': loading,
          'van-button--disabled': disabled,
          'van-button--unclickable': disabled || loading
        })
      });
    }
  }
});
