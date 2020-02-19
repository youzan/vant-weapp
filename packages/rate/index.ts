import { VantComponent } from '../common/component';
import { Weapp } from 'definitions/weapp';

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
      }
    },
    readonly: Boolean,
    disabled: Boolean,
    allowHalf: Boolean,
    size: null,
    icon: {
      type: String,
      value: 'star'
    },
    voidIcon: {
      type: String,
      value: 'star-o'
    },
    color: {
      type: String,
      value: '#ffd21e'
    },
    voidColor: {
      type: String,
      value: '#c7c7c7'
    },
    disabledColor: {
      type: String,
      value: '#bdbdbd'
    },
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
      value: true
    }
  },

  data: {
    innerValue: 0,
    innerCountArray: Array.from({ length: 5 }),
  },

  methods: {
    onSelect(event: Weapp.Event) {
      const { data } = this;
      const { score } = event.currentTarget.dataset;
      if (!data.disabled && !data.readonly) {
        this.setData({ innerValue: score + 1 });
        this.$emit('input', score + 1);
        this.$emit('change', score + 1);
      }
    },

    onTouchMove(event: Weapp.TouchEvent) {
      const { touchable } = this.data;
      if (!touchable) return;

      const { clientX } = event.touches[0];

      this.getRect('.van-rate__icon', true).then(
        (list: WechatMiniprogram.BoundingClientRectCallbackResult[]) => {
          const target = list
            .sort(item => item.right - item.left)
            .find(item => clientX >= item.left && clientX <= item.right);
          if (target != null) {
            this.onSelect({
              ...event,
              currentTarget: target
            });
          }
        }
      );
    }
  }
});
