import { VantComponent } from '../common/component';
import { touch } from '../mixins/touch';
import { canIUseModel } from '../common/version';
import { getRect, addUnit } from '../common/utils';

type SliderValue = number | [number, number];

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
    vertical: Boolean,
    barHeight: null,
  },

  created() {
    this.updateValue(this.data.value);
  },

  methods: {
    onTouchStart(event: WechatMiniprogram.TouchEvent) {
      if (this.data.disabled) return;

      const { index } = event.currentTarget.dataset;
      if (typeof index === 'number') {
        this.buttonIndex = index;
      }

      this.touchStart(event);
      this.startValue = this.format(this.value);
      this.newValue = this.value;

      if (this.isRange(this.newValue)) {
        this.startValue = this.newValue.map((val) => this.format(val)) as [
          number,
          number
        ];
      } else {
        this.startValue = this.format(this.newValue);
      }
      this.dragStatus = 'start';
    },

    onTouchMove(event: WechatMiniprogram.TouchEvent) {
      if (this.data.disabled) return;

      if (this.dragStatus === 'start') {
        this.$emit('drag-start');
      }

      this.touchMove(event);
      this.dragStatus = 'draging';

      getRect(this, '.van-slider').then((rect) => {
        const { vertical } = this.data;
        const delta = vertical ? this.deltaY : this.deltaX;
        const total = vertical ? rect.height : rect.width;
        const diff = (delta / total) * this.getRange();

        if (this.isRange(this.startValue)) {
          (this.newValue as [number, number])[this.buttonIndex] =
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

    onClick(event: WechatMiniprogram.TouchEvent) {
      if (this.data.disabled) return;

      const { min } = this.data;

      getRect(this, '.van-slider').then((rect) => {
        const { vertical } = this.data;
        const touch = event.touches[0];
        const delta = vertical
          ? touch.clientY - rect.top
          : touch.clientX - rect.left;
        const total = vertical ? rect.height : rect.width;
        const value = Number(min) + (delta / total) * this.getRange();

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

    isRange(val: unknown): val is [number, number] {
      const { range } = this.data;
      return range && Array.isArray(val);
    },

    handleOverlap(value: [number, number]) {
      if (value[0] > value[1]) {
        return value.slice(0).reverse();
      }
      return value;
    },

    updateValue(value: SliderValue, end?: boolean, drag?: boolean) {
      if (this.isRange(value)) {
        value = this.handleOverlap(value).map((val) => this.format(val)) as [
          number,
          number
        ];
      } else {
        value = this.format(value);
      }

      this.value = value;

      const { vertical } = this.data;
      const mainAxis = vertical ? 'height' : 'width';

      this.setData({
        wrapperStyle: `
          background: ${this.data.inactiveColor || ''};
          ${vertical ? 'width' : 'height'}: ${addUnit(this.data.barHeight) || ''};
        `,
        barStyle: `
          ${mainAxis}: ${this.calcMainAxis()};
          left: ${vertical ? 0 : this.calcOffset()};
          top: ${vertical ? this.calcOffset() : 0};
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

    // 计算选中条的开始位置的偏移量
    calcOffset() {
      const { value } = this;
      const { min } = this.data;
      const scope = this.getScope();
      if (this.isRange(value)) {
        return `${((value[0] - Number(min)) * 100) / scope}%`;
      }
      return '0%';
    },

    format(value: number) {
      const { max, min, step } = this.data;
      return Math.round(Math.max(min, Math.min(value, max)) / step) * step;
    },
  },
});
