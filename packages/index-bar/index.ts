import { VantComponent } from '../common/component';
import { GREEN } from '../common/color';

const indexList = () => {
  const indexList = [];
  const charCodeOfA = 'A'.charCodeAt(0);

  for (let i = 0; i < 26; i++) {
    indexList.push(String.fromCharCode(charCodeOfA + i));
  }

  return indexList;
}

VantComponent({
  relation: {
    name: 'index-anchor',
    type: 'descendant',
    linked() {
      this.updateData();
    },
    linkChanged() {
      this.updateData();
    },
    unlinked() {
      this.updateData();
    }
  },

  props: {
    sticky: {
      type: Boolean,
      value: true
    },
    zIndex: {
      type: Number,
      value: 1
    },
    highlightColor: {
      type: String,
      value: GREEN
    },
    scrollTop: {
      type: Number,
      value: 0,
      observer: 'onScroll'
    },
    stickyOffsetTop: {
      type: Number,
      value: 0
    },
    indexList: {
      type: Array,
      value: indexList()
    }
  },

  data: {
    activeAnchorIndex: null,
    showSidebar: false
  },

  methods: {
    updateData() {
      this.timer && clearTimeout(this.timer)

      this.timer = setTimeout(() => {
        this.children = this.getRelationNodes('../index-anchor/index');

        this.setData({
          showSidebar: !!this.children.length
        });

        this.getRect('.van-index-bar__sidebar').then(res => {
          this.sidebar = {
            height: res.height,
            top: res.top
          };
        });
      }, 0);
    },

    setDiffData({ target, data }) {
      const diffData = {};

      Object.keys(data).forEach(key => {
        if (target.data[key] !== data[key]) {
          diffData[key] = data[key];
        }
      });

      if (Object.keys(diffData).length) {
        target.setData(diffData);
      }
    },

    getScrollerRect() {
      return this.getRect('.van-index-bar').then(
        (rect: WechatMiniprogram.BoundingClientRectCallbackResult) => {
          return {
            height: rect.height,
            top: rect.top
          };
        }
      );
    },

    getAnchorRect(anchor) {
      return anchor.getRect('.van-index-anchor-wrapper').then(
        (rect: WechatMiniprogram.BoundingClientRectCallbackResult) => {
          return {
            height: rect.height,
            top: rect.top
          };
        }
      ); 
    },
    
    getAnchorsRectList() {
      return Promise.all(this.children.map(item => {
        return this.getAnchorRect(item);
      }))
    },

    getActiveAnchorIndex(anchorRects) {
      for (let i = this.children.length - 1; i >= 0; i--) {
        const preAnchorHeight = i > 0 ? anchorRects[i - 1].height : 0;

        if (preAnchorHeight + this.data.stickyOffsetTop >= anchorRects[i].top) {
          return i;
        }
      }

      return -1;
    },

    onScroll() {
      if (!this.children.length) {
        return;
      }

      Promise.all([
        this.getScrollerRect(),
        this.getAnchorsRectList()
      ]).then(res => {
        const [
          scrollerRect,
          anchorRects
        ] = res;

        const active = this.getActiveAnchorIndex(anchorRects);

        this.setDiffData({
          target: this,
          data: {
            activeAnchorIndex: active
          }
        });

        if (this.data.sticky) {
          let isActiveAnchorSticky = false;

          if (active !== -1) {
            isActiveAnchorSticky = anchorRects[active].top <= this.data.stickyOffsetTop
          }

          this.children.forEach((item, index) => {
            if (index === active) {
              let anchorStyle = '';
              let wrapperStyle = '';

              if (isActiveAnchorSticky) {
                anchorStyle = `
                  position: fixed;
                  top: ${this.data.stickyOffsetTop};
                `;
                
                wrapperStyle = `
                  height: ${anchorRects[index].height}px;
                `;
              }

              this.setDiffData({
                target: item,
                data: {
                  active: true,
                  anchorStyle,
                  wrapperStyle
                }
              });
            } else if (index === active - 1) {
              const currentAnchor = anchorRects[index];

              const currentOffsetTop = currentAnchor.top;
              const targetOffsetTop = index === this.children.length - 1
                ? scrollerRect.top
                : anchorRects[index + 1].top;
              
              const parentOffsetHeight = targetOffsetTop - currentOffsetTop;
              const translateY = parentOffsetHeight - currentAnchor.height;

              const anchorStyle = `
                position: relative;
                transform: translate3d(0, ${translateY}px, 0);
              `;

              this.setDiffData({
                target: item,
                data: {
                  active: true,
                  anchorStyle
                }
              });
            } else {
              this.setDiffData({
                target: item,
                data: {
                  active: false,
                  anchorStyle: '',
                  wrapperStyle: '',
                }
              });
            }
          });
        }
      });
    },

    onClick(event) {
      const index = event.target.dataset.index;

      this.scrollToAnchor(index);
    },

    onTouchMove(event) {
      const sidebarLength = this.children.length;
      const touch = event.touches[0];
      const itemHeight = this.sidebar.height / sidebarLength;
      let index = Math.floor((touch.pageY - this.data.scrollTop - this.sidebar.top) / itemHeight);

      if (index < 0) {
        index = 0;
      } else if (index > sidebarLength -1) {
        index = sidebarLength -1;
      }

      this.scrollToAnchor(index);
    },

    scrollToAnchor(index) {
      if (typeof index !== 'number') {
        return;
      }

      const anchor = this.children.filter(item => item.data.index === this.data.indexList[index])[0];

      anchor && this.getAnchorRect(anchor).then(res => {
        wx.pageScrollTo({
          duration: 0,
          scrollTop: res.top + this.data.scrollTop
        });
      });
    }
  }
});