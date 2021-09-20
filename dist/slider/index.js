import { VantComponent } from '../common/component';
import { touch } from '../mixins/touch';
import { canIUseModel } from '../common/version';
import { getRect } from '../common/utils';
VantComponent({
  mixins: [touch],
  props: {
    range: Boolean,
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
      type: null,
      value: 0,
      observer(val) {
        if (val !== this.value) {
          this.updateValue(val);
        }
      },
    },
    barHeight: null,
  },
  created() {
    this.updateValue(this.data.value);
  },
  methods: {
    onTouchStart(event) {
      if (this.data.disabled) return;
      const { index } = event.currentTarget.dataset;
      if (typeof index === 'number') {
        this.buttonIndex = index;
      }
      this.touchStart(event);
      this.startValue = this.format(this.value);
      this.newValue = this.value;
      if (this.isRange(this.newValue)) {
        this.startValue = this.newValue.map((val) => this.format(val));
      } else {
        this.startValue = this.format(this.newValue);
      }
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
        if (this.isRange(this.startValue)) {
          this.newValue[this.buttonIndex] =
            this.startValue[this.buttonIndex] + diff;
        } else {
          this.newValue = this.startValue + diff;
        }
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
        if (this.isRange(this.value)) {
          const [left, right] = this.value;
          const middle = (left + right) / 2;
          if (value <= middle) {
            this.updateValue([value, right], true);
          } else {
            this.updateValue([left, value], true);
          }
        } else {
          this.updateValue(value, true);
        }
      });
    },
    isRange(val) {
      const { range } = this.data;
      return range && Array.isArray(val);
    },
    handleOverlap(value) {
      if (value[0] > value[1]) {
        return value.slice(0).reverse();
      }
      return value;
    },
    updateValue(value, end, drag) {
      if (this.isRange(value)) {
        value = this.handleOverlap(value).map((val) => this.format(val));
      } else {
        value = this.format(value);
      }
      this.value = value;
      this.setData({
        barStyle: `
          width: ${this.calcMainAxis()};
          left: ${this.isRange(value) ? `${value[0]}%` : 0};
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
    getScope() {
      return Number(this.data.max) - Number(this.data.min);
    },
    getRange() {
      const { max, min } = this.data;
      return max - min;
    },
    // 计算选中条的长度百分比
    calcMainAxis() {
      const { value } = this;
      const { min } = this.data;
      const scope = this.getScope();
      if (this.isRange(value)) {
        return `${((value[1] - value[0]) * 100) / scope}%`;
      }
      return `${((value - Number(min)) * 100) / scope}%`;
    },
    format(value) {
      const { max, min, step } = this.data;
      return Math.round(Math.max(min, Math.min(value, max)) / step) * step;
    },
  },
});
