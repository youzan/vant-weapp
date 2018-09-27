import { VantComponent } from '../common/component';
import { button } from '../mixins/button';
import { openType } from '../mixins/open-type';
VantComponent({
  mixins: [button, openType],
  props: {
    plain: Boolean,
    block: Boolean,
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
    classes: function classes() {
      var _this$data = this.data,
          type = _this$data.type,
          size = _this$data.size,
          plain = _this$data.plain,
          disabled = _this$data.disabled,
          loading = _this$data.loading,
          square = _this$data.square,
          block = _this$data.block;
      return this.classNames("van-button--" + type, "van-button--" + size, {
        'van-button--block': block,
        'van-button--plain': plain,
        'van-button--square': square,
        'van-button--loading': loading,
        'van-button--disabled': disabled,
        'van-button--unclickable': disabled || loading
      });
    }
  },
  methods: {
    onClick: function onClick() {
      if (!this.data.disabled && !this.data.loading) {
        this.$emit('click');
      }
    }
  }
});