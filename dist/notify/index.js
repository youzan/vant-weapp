import { VantComponent } from '../common/component';
VantComponent({
  props: {
    text: String,
    color: {
      type: String,
      value: '#fff'
    },
    backgroundColor: {
      type: String,
      value: '#e64340'
    },
    duration: {
      type: Number,
      value: 3000
    }
  },
  methods: {
    show: function show() {
      var _this = this;

      var duration = this.data.duration;
      clearTimeout(this.timer);
      this.setData({
        show: true
      });

      if (duration > 0 && duration !== Infinity) {
        this.timer = setTimeout(function () {
          _this.hide();
        }, duration);
      }
    },
    hide: function hide() {
      clearTimeout(this.timer);
      this.setData({
        show: false
      });
    }
  }
});