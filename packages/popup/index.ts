import { VantComponent } from '../common/component';
import { transition } from '../mixins/transition';
import { iphonex } from '../mixins/iphonex';

VantComponent({
  mixins: [transition(false), iphonex],

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
    popupClass() {
      const { position, safeAreaInsetBottom, isIPhoneX } = this.data;
      return this.classNames('custom-class', 'van-popup', {
        [`van-popup--${position}`]: position,
        [`van-popup--safe`]: isIPhoneX && safeAreaInsetBottom && position === 'bottom'
      });
    }
  },

  methods: {
    onClickOverlay() {
      this.$emit('click-overlay');

      if (this.data.closeOnClickOverlay) {
        this.$emit('close');
      }
    }
  }
});
