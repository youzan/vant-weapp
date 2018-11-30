import { VantComponent } from '../common/component';

VantComponent({
  props: {
    safeAreaInsetBottom: {
      type: Boolean,
      value: true
    }
  },

  computed: {
    rootClass() {
      const { safeAreaInsetBottom, isIPhoneX } = this.data;
      return this.classNames('van-goods-action', 'custom-class', {
        [`van-goods-action--safe`]: isIPhoneX && safeAreaInsetBottom
      });
    }
  }
});
