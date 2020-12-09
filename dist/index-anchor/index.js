import { getRect } from '../common/utils';
import { VantComponent } from '../common/component';
VantComponent({
  relation: {
    name: 'index-bar',
    type: 'ancestor',
    current: 'index-anchor',
  },
  props: {
    useSlot: Boolean,
    index: null,
  },
  data: {
    active: false,
    wrapperStyle: '',
    anchorStyle: '',
  },
  methods: {
    scrollIntoView(scrollTop) {
      getRect.call(this, '.van-index-anchor-wrapper').then((rect) => {
        wx.pageScrollTo({
          duration: 0,
          scrollTop: scrollTop + rect.top - this.parent.data.stickyOffsetTop,
        });
      });
    },
  },
});
