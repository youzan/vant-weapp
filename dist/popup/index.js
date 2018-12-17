import { VantComponent } from '../common/component';
import { transition } from '../mixins/transition';
VantComponent({
  mixins: [transition(false)],
  props: {
    transition: String,
    customStyle: String,
    overlayStyle: String,
    zIndex: {
      type: Number,
      value: 100
    },
    overlay: {
      type: Boolean,
      value: true
    },
    closeOnClickOverlay: {
      type: Boolean,
      value: true
    },
    position: {
      type: String,
      value: 'center'
    },
    safeAreaInsetBottom: {
      type: Boolean,
      value: true
    }
  },
  computed: {
    popupClass: function popupClass() {
      var _this$data = this.data,
          position = _this$data.position,
          safeAreaInsetBottom = _this$data.safeAreaInsetBottom,
          isIPhoneX = _this$data.isIPhoneX;
      return this.classNames('custom-class', 'van-popup', {
        ["van-popup--" + position]: position,
        ["van-popup--safe"]: isIPhoneX && safeAreaInsetBottom && position === 'bottom'
      });
    }
  },
  methods: {
    onClickOverlay: function onClickOverlay() {
      this.$emit('click-overlay');

      if (this.data.closeOnClickOverlay) {
        this.$emit('close');
      }
    }
  }
});