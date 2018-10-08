import { VantComponent } from '../common/component';
import { button } from '../mixins/button';
import { openType } from '../mixins/open-type';

VantComponent({
  classes: ['loading-class'],

  mixins: [button, openType],

  props: {
    plain: Boolean,
    block: Boolean,
    round: Boolean,
    square: Boolean,
    loading: Boolean,
    disabled: Boolean,
    type: {
      type: String,
      value: 'default'
    },
    size: {
      type: String,
      value: 'normal'
    }
  },

  computed: {
    classes(): string {
      const { type, size, block, plain, round, square, loading, disabled } = this.data;
      return this.classNames(`van-button--${type}`, `van-button--${size}`, {
        'van-button--block': block,
        'van-button--round': round,
        'van-button--plain': plain,
        'van-button--square': square,
        'van-button--loading': loading,
        'van-button--disabled': disabled,
        'van-button--unclickable': disabled || loading
      });
    }
  },

  methods: {
    onClick() {
      if (!this.data.disabled && !this.data.loading) {
        this.$emit('click');
      }
    }
  }
});
