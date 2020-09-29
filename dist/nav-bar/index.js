import { VantComponent } from '../common/component';
import { getRect, getSystemInfoSync } from '../common/utils';
VantComponent({
  classes: ['title-class'],
  props: {
    title: String,
    fixed: {
      type: Boolean,
      observer: 'setHeight',
    },
    placeholder: {
      type: Boolean,
      observer: 'setHeight',
    },
    leftText: String,
    rightText: String,
    customStyle: String,
    leftArrow: Boolean,
    border: {
      type: Boolean,
      value: true,
    },
    zIndex: {
      type: Number,
      value: 1,
    },
    safeAreaInsetTop: {
      type: Boolean,
      value: true,
    },
  },
  data: {
    height: 46,
  },
  created() {
    const { statusBarHeight } = getSystemInfoSync();
    this.setData({
      statusBarHeight,
      height: 46 + statusBarHeight,
    });
  },
  mounted() {
    this.setHeight();
  },
  methods: {
    onClickLeft() {
      this.$emit('click-left');
    },
    onClickRight() {
      this.$emit('click-right');
    },
    setHeight() {
      if (!this.data.fixed || !this.data.placeholder) {
        return;
      }
      wx.nextTick(() => {
        getRect.call(this, '.van-nav-bar').then((res) => {
          this.setData({ height: res.height });
        });
      });
    },
  },
});
