import { VantComponent } from '../common/component';
VantComponent({
  props: {
    safeAreaInsetBottom: {
      type: Boolean,
      value: true
    }
  },
  computed: {
    rootClass: function rootClass() {
      var _this$data = this.data,
          safeAreaInsetBottom = _this$data.safeAreaInsetBottom,
          isIPhoneX = _this$data.isIPhoneX;
      return this.classNames('van-goods-action', 'custom-class', {
        ["van-goods-action--safe"]: isIPhoneX && safeAreaInsetBottom
      });
    }
  }
});