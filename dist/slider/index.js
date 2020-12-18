import { VantComponent } from '../common/component';
import { touch } from '../mixins/touch';
import { canIUseModel } from '../common/version';
import { getRect } from '../common/utils';
VantComponent({
  mixins: [touch],
  props: {
    disabled: Boolean,
    useButtonSlot: Boolean,
    activeColor: String,
    inactiveColor: String,
    max: {
      type: Number,
      value: 100,
    },
    min: {
      type: Number,
      value: 0,
    },
    step: {
      type: Number,
      value: 1,
    },
    value: {
      type: Number,
      value: 0,
      observer(val) {
        if (val !== this.value) {
          this.updateValue(val);
        }
      },
    },
    barHeight: {
      type: null,
      value: 2,
    },
  },
  created() {
    this.updateValue(this.data.value);
  },
  methods: {
    onTouchStart(event) {
      if (this.data.disabled) return;
      this.touchStart(event);
      this.startValue = this.format(this.value);
      this.dragStatus = 'start';
    },
    onTouchMove(event) {
      if (this.data.disabled) return;
      if (this.dragStatus === 'start') {
        this.$emit('drag-start');
      }
      this.touchMove(event);
      this.dragStatus = 'draging';
      getRect(this, '.van-slider').then((rect) => {
        const diff = (this.deltaX / rect.width) * this.getRange();
        this.newValue = this.startValue + diff;
        this.updateValue(this.newValue, false, true);
      });
    },
    onTouchEnd() {
      if (this.data.disabled) return;
      if (this.dragStatus === 'draging') {
        this.updateValue(this.newValue, true);
        this.$emit('drag-end');
      }
    },
    onClick(event) {
      if (this.data.disabled) return;
      const { min } = this.data;
      getRect(this, '.van-slider').then((rect) => {
        const value =
          ((event.detail.x - rect.left) / rect.width) * this.getRange() + min;
        this.updateValue(value, true);
      });
    },
    updateValue(value, end, drag) {
      value = this.format(value);
      const { min } = this.data;
      const width = `${((value - min) * 100) / this.getRange()}%`;
      this.value = value;
      this.setData({
        barStyle: `
          width: ${width};
          ${drag ? 'transition: none;' : ''}
        `,
      });
      if (drag) {
        this.$emit('drag', { value });
      }
      if (end) {
        this.$emit('change', value);
      }
      if ((drag || end) && canIUseModel()) {
        this.setData({ value });
      }
    },
    getRange() {
      const { max, min } = this.data;
      return max - min;
    },
    format(value) {
      const { max, min, step } = this.data;
      return Math.round(Math.max(min, Math.min(value, max)) / step) * step;
    },
  },
});
