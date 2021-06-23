import { nextTick, getAllRect } from '../common/utils';
import { VantComponent } from '../common/component';
import { canIUseModel } from '../common/version';

VantComponent({
  field: true,

  classes: ['icon-class'],

  props: {
    value: {
      type: Number,
      observer(value: number) {
        if (value !== this.data.innerValue) {
          this.setData({ innerValue: value });
        }
      },
    },
    readonly: Boolean,
    disabled: Boolean,
    allowHalf: Boolean,
    size: null,
    icon: {
      type: String,
      value: 'star',
    },
    voidIcon: {
      type: String,
      value: 'star-o',
    },
    color: String,
    voidColor: String,
    disabledColor: String,
    count: {
      type: Number,
      value: 5,
    },
    gutter: null,
    touchable: {
      type: Boolean,
      value: true,
    },
  },

  data: {
    innerValue: 0,
    ranges: [] as Array<{ left: number; score: number }>,
  },

  created() {
    nextTick(() => {
      this.updateRanges();
    });
  },

  methods: {
    updateRanges() {
      getAllRect(this, '.van-rate__item').then((rects) => {
        const ranges: any = [];
        rects.forEach((rect, index) => {
          if (this.data.allowHalf) {
            ranges.push(
              { score: index + 0.5, left: rect.left },
              { score: index + 1, left: rect.left + rect.width / 2 }
            );
          } else {
            ranges.push({ score: index + 1, left: rect.left });
          }
        });

        this.setData({ ranges });
      });
    },

    getScoreByPosition(x: number) {
      const { ranges } = this.data;
      for (let i = ranges.length - 1; i > 0; i--) {
        if (x > ranges[i].left) {
          return ranges[i].score;
        }
      }
      return this.data.allowHalf ? 0.5 : 1;
    },

    onClickItem(event: WechatMiniprogram.TouchEvent) {
      const { clientX } = event.touches[0];
      const { score } = event.currentTarget.dataset;
      const { allowHalf } = this.data;

      this.updateRanges();
      this.select(allowHalf ? this.getScoreByPosition(clientX) : score);
    },

    select(index: number) {
      const { disabled, readonly, innerValue } = this.data;
      if (!disabled && !readonly && index !== innerValue) {
        this.setData({ innerValue: index });

        if (canIUseModel()) {
          this.setData({ value: index });
        }

        wx.nextTick(() => {
          this.$emit('input', index);
          this.$emit('change', index);
        });
      }
    },

    onTouchStart() {
      const { touchable } = this.data;
      if (!touchable) return;

      this.updateRanges();
    },

    onTouchMove(event: WechatMiniprogram.TouchEvent) {
      const { touchable } = this.data;
      if (!touchable) return;

      const { clientX } = event.touches[0];
      this.select(this.getScoreByPosition(clientX));
    },
  },
});
