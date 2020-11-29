import { getRect } from '../common/utils';
import { VantComponent } from '../common/component';
VantComponent({
  relation: {
    name: 'tabbar-item',
    type: 'descendant',
    current: 'tabbar',
    linked(target) {
      target.parent = this;
      target.updateFromParent();
    },
    unlinked() {
      this.updateChildren();
    },
  },
  props: {
    active: {
      type: null,
      observer: 'updateChildren',
    },
    activeColor: {
      type: String,
      observer: 'updateChildren',
    },
    inactiveColor: {
      type: String,
      observer: 'updateChildren',
    },
    fixed: {
      type: Boolean,
      value: true,
      observer: 'setHeight',
    },
    placeholder: {
      type: Boolean,
      observer: 'setHeight',
    },
    border: {
      type: Boolean,
      value: true,
    },
    zIndex: {
      type: Number,
      value: 1,
    },
    safeAreaInsetBottom: {
      type: Boolean,
      value: true,
    },
  },
  data: {
    height: 50,
  },
  methods: {
    updateChildren() {
      const { children } = this;
      if (!Array.isArray(children) || !children.length) {
        return;
      }
      children.forEach((child) => child.updateFromParent());
    },
    setHeight() {
      if (!this.data.fixed || !this.data.placeholder) {
        return;
      }
      wx.nextTick(() => {
        getRect.call(this, '.van-tabbar').then((res) => {
          this.setData({ height: res.height });
        });
      });
    },
  },
});
