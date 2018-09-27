import { VantComponent } from '../common/component';
import { touch } from '../mixins/touch';
VantComponent({
  mixins: [touch],
  props: {
    disabled: Boolean,
    max: {
      type: Number,
      value: 100
    },
    min: {
      type: Number,
      value: 0
    },
    step: {
      type: Number,
      value: 1
    },
    value: {
      type: Number,
      value: 0
    },
    barHeight: {
      type: String,
      value: '2px'
    }
  },
  created: function created() {
    this.updateValue(this.data.value);
  },
  methods: {
    onTouchStart: function onTouchStart(event) {
      if (this.data.disabled) return;
      this.touchStart(event);
      this.startValue = this.format(this.data.value);
    },
    onTouchMove: function onTouchMove(event) {
      var _this = this;

      if (this.data.disabled) return;
      this.touchMove(event);
      this.getRect('.van-slider').then(function (rect) {
        var diff = _this.deltaX / rect.width * 100;

        _this.updateValue(_this.startValue + diff);
      });
    },
    onTouchEnd: function onTouchEnd() {
      if (this.data.disabled) return;
      this.updateValue(this.data.value, true);
    },
    onClick: function onClick(event) {
      var _this2 = this;

      if (this.data.disabled) return;
      this.getRect(function (rect) {
        var value = (event.detail.x - rect.left) / rect.width * 100;

        _this2.updateValue(value, true);
      });
    },
    updateValue: function updateValue(value, end) {
      value = this.format(value);
      this.setData({
        value: value,
        barStyle: "width: " + value + "%; height: " + this.data.barHeight + ";"
      });

      if (end) {
        this.$emit('change', value);
      }
    },
    format: function format(value) {
      var _this$data = this.data,
          max = _this$data.max,
          min = _this$data.min,
          step = _this$data.step;
      return Math.round(Math.max(min, Math.min(value, max)) / step) * step;
    }
  }
});