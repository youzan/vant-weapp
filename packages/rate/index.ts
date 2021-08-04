import { getAllRect } from '../common/utils';
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
      observer(value: number) {
        this.setData({ innerCountArray: Array.from({ length: value }) });
      },
    },
    gutter: null,
    touchable: {
      type: Boolean,
      value: true,
    },
  },

  data: {
    innerValue: 0,
    innerCountArray: Array.from({ length: 5 }),
  },

  methods: {
    onSelect(event: WechatMiniprogram.CustomEvent) {
      const { data } = this;
      const { score } = event.currentTarget.dataset;
      if (!data.disabled && !data.readonly) {
        this.setData({ innerValue: score + 1 });

        if (canIUseModel()) {
          this.setData({ value: score + 1 });
        }

        wx.nextTick(() => {
          this.$emit('input', score + 1);
          this.$emit('change', score + 1);
        });
      }
    },

    onTouchMove(event: WechatMiniprogram.TouchEvent) {
      const { touchable } = this.data;
      if (!touchable) return;

      const { clientX } = event.touches[0];

      getAllRect(this, '.van-rate__icon').then((list) => {
        const target = list
          .sort((cur, next) => cur.dataset.score - next.dataset.score)
          .find((item) => clientX >= item.left && clientX <= item.right);

        if (target != null) {
          this.onSelect({
            ...event,
            currentTarget: (target as unknown) as WechatMiniprogram.Target,
          });
        }
      });
    },
  },
});
