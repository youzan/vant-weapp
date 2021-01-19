import { GREEN } from '../common/color';
import { VantComponent } from '../common/component';
import { useChildren } from '../common/relation';
import { getRect } from '../common/utils';
import { pageScrollMixin } from '../mixins/page-scroll';
const indexList = () => {
  const indexList = [];
  const charCodeOfA = 'A'.charCodeAt(0);
  for (let i = 0; i < 26; i++) {
    indexList.push(String.fromCharCode(charCodeOfA + i));
  }
  return indexList;
};
VantComponent({
  relation: useChildren('index-anchor', function () {
    this.updateData();
  }),
  props: {
    sticky: {
      type: Boolean,
      value: true,
    },
    zIndex: {
      type: Number,
      value: 1,
    },
    highlightColor: {
      type: String,
      value: GREEN,
    },
    stickyOffsetTop: {
      type: Number,
      value: 0,
    },
    indexList: {
      type: Array,
      value: indexList(),
    },
  },
  mixins: [
    pageScrollMixin(function (event) {
      this.scrollTop =
        (event === null || event === void 0 ? void 0 : event.scrollTop) || 0;
      this.onScroll();
    }),
  ],
  data: {
    activeAnchorIndex: null,
    showSidebar: false,
  },
  created() {
    this.scrollTop = 0;
  },
  methods: {
    updateData() {
      wx.nextTick(() => {
        if (this.timer != null) {
          clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
          this.setData({
            showSidebar: !!this.children.length,
          });
          this.setRect().then(() => {
            this.onScroll();
          });
        }, 0);
      });
    },
    setRect() {
      return Promise.all([
        this.setAnchorsRect(),
        this.setListRect(),
        this.setSiderbarRect(),
      ]);
    },
    setAnchorsRect() {
      return Promise.all(
        this.children.map((anchor) =>
          getRect(anchor, '.van-index-anchor-wrapper').then((rect) => {
            Object.assign(anchor, {
              height: rect.height,
              top: rect.top + this.scrollTop,
            });
          })
        )
      );
    },
    setListRect() {
      return getRect(this, '.van-index-bar').then((rect) => {
        Object.assign(this, {
          height: rect.height,
          top: rect.top + this.scrollTop,
        });
      });
    },
    setSiderbarRect() {
      return getRect(this, '.van-index-bar__sidebar').then((res) => {
        this.sidebar = {
          height: res.height,
          top: res.top,
        };
      });
    },
    setDiffData({ target, data }) {
      const diffData = {};
      Object.keys(data).forEach((key) => {
        if (target.data[key] !== data[key]) {
          diffData[key] = data[key];
        }
      });
      if (Object.keys(diffData).length) {
        target.setData(diffData);
      }
    },
    getAnchorRect(anchor) {
      return getRect(anchor, '.van-index-anchor-wrapper').then((rect) => ({
        height: rect.height,
        top: rect.top,
      }));
    },
    getActiveAnchorIndex() {
      const { children, scrollTop } = this;
      const { sticky, stickyOffsetTop } = this.data;
      for (let i = this.children.length - 1; i >= 0; i--) {
        const preAnchorHeight = i > 0 ? children[i - 1].height : 0;
        const reachTop = sticky ? preAnchorHeight + stickyOffsetTop : 0;
        if (reachTop + scrollTop >= children[i].top) {
          return i;
        }
      }
      return -1;
    },
    onScroll() {
      const { children = [], scrollTop } = this;
      if (!children.length) {
        return;
      }
      const { sticky, stickyOffsetTop, zIndex, highlightColor } = this.data;
      const active = this.getActiveAnchorIndex();
      this.setDiffData({
        target: this,
        data: {
          activeAnchorIndex: active,
        },
      });
      if (sticky) {
        let isActiveAnchorSticky = false;
        if (active !== -1) {
          isActiveAnchorSticky =
            children[active].top <= stickyOffsetTop + scrollTop;
        }
        children.forEach((item, index) => {
          if (index === active) {
            let wrapperStyle = '';
            let anchorStyle = `
              color: ${highlightColor};
            `;
            if (isActiveAnchorSticky) {
              wrapperStyle = `
                height: ${children[index].height}px;
              `;
              anchorStyle = `
                position: fixed;
                top: ${stickyOffsetTop}px;
                z-index: ${zIndex};
                color: ${highlightColor};
              `;
            }
            this.setDiffData({
              target: item,
              data: {
                active: true,
                anchorStyle,
                wrapperStyle,
              },
            });
          } else if (index === active - 1) {
            const currentAnchor = children[index];
            const currentOffsetTop = currentAnchor.top;
            const targetOffsetTop =
              index === children.length - 1
                ? this.top
                : children[index + 1].top;
            const parentOffsetHeight = targetOffsetTop - currentOffsetTop;
            const translateY = parentOffsetHeight - currentAnchor.height;
            const anchorStyle = `
              position: relative;
              transform: translate3d(0, ${translateY}px, 0);
              z-index: ${zIndex};
              color: ${highlightColor};
            `;
            this.setDiffData({
              target: item,
              data: {
                active: true,
                anchorStyle,
              },
            });
          } else {
            this.setDiffData({
              target: item,
              data: {
                active: false,
                anchorStyle: '',
                wrapperStyle: '',
              },
            });
          }
        });
      }
    },
    onClick(event) {
      this.scrollToAnchor(event.target.dataset.index);
    },
    onTouchMove(event) {
      const sidebarLength = this.children.length;
      const touch = event.touches[0];
      const itemHeight = this.sidebar.height / sidebarLength;
      let index = Math.floor((touch.clientY - this.sidebar.top) / itemHeight);
      if (index < 0) {
        index = 0;
      } else if (index > sidebarLength - 1) {
        index = sidebarLength - 1;
      }
      this.scrollToAnchor(index);
    },
    onTouchStop() {
      this.scrollToAnchorIndex = null;
    },
    scrollToAnchor(index) {
      if (typeof index !== 'number' || this.scrollToAnchorIndex === index) {
        return;
      }
      this.scrollToAnchorIndex = index;
      const anchor = this.children.find(
        (item) => item.data.index === this.data.indexList[index]
      );
      if (anchor) {
        anchor.scrollIntoView(this.scrollTop);
        this.$emit('select', anchor.data.index);
      }
    },
  },
});
