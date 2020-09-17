import { VantComponent } from '../common/component';
import { getSystemInfoSync } from '../common/utils';
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
    statusBarHeight: 0,
    height: 44,
    baseStyle: '',
  },
  created() {
    const { statusBarHeight } = getSystemInfoSync();
    const { safeAreaInsetTop, zIndex } = this.data;
    const paddingTop = safeAreaInsetTop ? statusBarHeight : 0;
    const baseStyle = `z-index: ${zIndex};padding-top: ${paddingTop}px;`;
    this.setData({
      statusBarHeight,
      height: 44 + statusBarHeight,
      baseStyle,
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
        this.getRect('.van-nav-bar').then((res) => {
          this.setData({ height: res.height });
        });
      });
    },
  },
});
