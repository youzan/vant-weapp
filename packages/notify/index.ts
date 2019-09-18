
import { Weapp } from 'definitions/weapp';
import { VantComponent } from '../common/component';
import { WHITE } from '../common/color';
import { safeArea } from '../mixins/safe-area';

VantComponent({
  mixins: [safeArea()],

  props: {
    type: {
      type: String,
      value: 'danger'
    },
    message: String,
    color: {
      type: String,
      value: WHITE
    },
    background: String,
    duration: {
      type: Number,
      value: 3000
    },
    zIndex: {
      type: Number,
      value: 110
    }
  },

  methods: {
    show() {
      const { duration, onOpened } = this.data;

      clearTimeout(this.timer);
      this.setData({
        show: true
      }, onOpened);

      if (duration > 0 && duration !== Infinity) {
        this.timer = setTimeout(() => {
          this.hide();
        }, duration);
      }
    },

    hide() {
      const { onClose } = this.data;

      clearTimeout(this.timer);
      this.setData({
        show: false
      }, onClose);
    },

    onTap(event: Weapp.Event) {
      const { onClick } = this.data;
      if (onClick) {
        onClick(event.detail);
      }
    }
  }
});
