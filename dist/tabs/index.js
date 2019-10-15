import { VantComponent } from '../common/component';
import { touch } from '../mixins/touch';
import { nextTick, isDef, addUnit } from '../common/utils';
VantComponent({
    mixins: [touch],
    classes: ['nav-class', 'tab-class', 'tab-active-class', 'line-class'],
    relation: {
        name: 'tab',
        type: 'descendant',
        linked(child) {
            child.index = this.children.length;
            child.setComputedName();
            this.children.push(child);
            this.updateTabs(this.data.tabs.concat(child.data));
        },
        unlinked(child) {
            const index = this.children.indexOf(child);
            const { tabs } = this.data;
            tabs.splice(index, 1);
            this.children.splice(index, 1);
            let i = index;
            while (i >= 0 && i < this.children.length) {
                const currentChild = this.children[i];
                currentChild.index--;
                currentChild.setComputedName();
                i++;
            }
            this.updateTabs(tabs);
        }
    },
    props: {
        color: String,
        sticky: Boolean,
        animated: Boolean,
        swipeable: Boolean,
        lineWidth: {
            type: [String, Number],
            value: -1
        },
        lineHeight: {
            type: [String, Number],
            value: -1
        },
        active: {
            type: [String, Number],
            value: 0,
        },
        type: {
            type: String,
            value: 'line'
        },
        border: {
            type: Boolean,
            value: true
        },
        duration: {
            type: Number,
            value: 0.3
        },
        zIndex: {
            type: Number,
            value: 1
        },
        swipeThreshold: {
            type: Number,
            value: 4
        },
        offsetTop: {
            type: Number,
            value: 0
        }
    },
    data: {
        tabs: [],
        lineStyle: '',
        scrollLeft: 0,
        scrollable: false,
        trackStyle: '',
        wrapStyle: '',
        position: '',
        currentIndex: 0,
    },
    watch: {
        swipeThreshold() {
            this.setData({
                scrollable: this.children.length > this.data.swipeThreshold
            });
        },
        color: 'setLine',
        lineWidth: 'setLine',
        lineHeight: 'setLine',
        active: 'setActiveTab',
        animated: 'setTrack',
        offsetTop: 'setWrapStyle'
    },
    beforeCreate() {
        this.children = [];
    },
    mounted() {
        this.setLine(true);
        this.setTrack();
        this.scrollIntoView();
        this.getRect('.van-tabs__wrap').then((rect) => {
            this.navHeight = rect.height;
            this.observerContentScroll();
        });
    },
    destroyed() {
        // @ts-ignore
        this.createIntersectionObserver().disconnect();
    },
    methods: {
        updateTabs(tabs) {
            tabs = tabs || this.data.tabs;
            this.setData({
                tabs,
                scrollable: tabs.length > this.data.swipeThreshold
            });
            this.setActiveTab();
        },
        trigger(eventName, name) {
            const { tabs, currentIndex } = this.data;
            this.$emit(eventName, {
                name,
                title: tabs[currentIndex].title
            });
        },
        onTap(event) {
            const { index } = event.currentTarget.dataset;
            const child = this.children[index];
            if (this.data.tabs[index].disabled) {
                this.trigger('disabled', child.computedName);
            }
            else {
                this.trigger('click', child.computedName);
                this.setActive(child.computedName);
            }
        },
        setActive(computedName) {
            if (computedName !== this.currentName) {
                this.currentName = computedName;
                this.trigger('change', computedName);
                this.setActiveTab();
            }
        },
        setLine(skipTransition) {
            if (this.data.type !== 'line') {
                return;
            }
            const { color, duration, currentIndex, lineWidth, lineHeight } = this.data;
            this.getRect('.van-tab', true).then((rects) => {
                const rect = rects[currentIndex];
                const width = lineWidth !== -1 ? lineWidth : rect.width / 2;
                const height = lineHeight !== -1 ? `height: ${addUnit(lineHeight)}; border-radius: ${addUnit(lineHeight)};` : '';
                let left = rects
                    .slice(0, currentIndex)
                    .reduce((prev, curr) => prev + curr.width, 0);
                left += (rect.width - width) / 2;
                const transition = skipTransition
                    ? ''
                    : `transition-duration: ${duration}s; -webkit-transition-duration: ${duration}s;`;
                this.setData({
                    lineStyle: `
            ${height}
            width: ${addUnit(width)};
            background-color: ${color};
            -webkit-transform: translateX(${left}px);
            transform: translateX(${left}px);
            ${transition}
          `
                });
            });
        },
        setTrack() {
            const { animated, duration, currentIndex } = this.data;
            if (!animated)
                return '';
            this.getRect('.van-tabs__content').then((rect) => {
                const { width } = rect;
                this.setData({
                    trackStyle: `
              width: ${width * this.children.length}px;
              left: ${-1 * currentIndex * width}px;
              transition: left ${duration}s;
              display: -webkit-box;
              display: flex;
            `
                });
                const data = { width, animated };
                this.children.forEach((item) => {
                    item.setData(data);
                });
            });
        },
        setActiveTab() {
            if (!isDef(this.currentName)) {
                this.currentName = this.data.active || (this.children[0] || {}).computedName;
            }
            this.children.forEach((item, index) => {
                const data = {
                    active: item.computedName === this.currentName
                };
                if (data.active) {
                    this.setData({
                        currentIndex: index
                    });
                    data.inited = true;
                }
                if (data.active !== item.data.active) {
                    item.setData(data);
                }
            });
            nextTick(() => {
                this.setLine();
                this.setTrack();
                this.scrollIntoView();
            });
        },
        // scroll active tab into view
        scrollIntoView() {
            const { currentIndex, scrollable } = this.data;
            if (!scrollable) {
                return;
            }
            Promise.all([
                this.getRect('.van-tab', true),
                this.getRect('.van-tabs__nav')
            ]).then(([tabRects, navRect]) => {
                const tabRect = tabRects[currentIndex];
                const offsetLeft = tabRects
                    .slice(0, currentIndex)
                    .reduce((prev, curr) => prev + curr.width, 0);
                this.setData({
                    scrollLeft: offsetLeft - (navRect.width - tabRect.width) / 2
                });
            });
        },
        onTouchStart(event) {
            if (!this.data.swipeable)
                return;
            this.touchStart(event);
        },
        onTouchMove(event) {
            if (!this.data.swipeable)
                return;
            this.touchMove(event);
        },
        // watch swipe touch end
        onTouchEnd() {
            if (!this.data.swipeable)
                return;
            const { tabs, currentIndex } = this.data;
            const { direction, deltaX, offsetX } = this;
            const minSwipeDistance = 50;
            if (direction === 'horizontal' && offsetX >= minSwipeDistance) {
                if (deltaX > 0 && currentIndex !== 0) {
                    this.setActive(this.children[currentIndex - 1].computedName);
                }
                else if (deltaX < 0 && currentIndex !== tabs.length - 1) {
                    this.setActive(this.children[currentIndex + 1].computedName);
                }
            }
        },
        setWrapStyle() {
            const { offsetTop, position } = this.data;
            let wrapStyle;
            switch (position) {
                case 'top':
                    wrapStyle = `
            top: ${offsetTop}px;
            position: fixed;
          `;
                    break;
                case 'bottom':
                    wrapStyle = `
            top: auto;
            bottom: 0;
          `;
                    break;
                default:
                    wrapStyle = '';
            }
            if (wrapStyle !== this.data.wrapStyle) {
                this.setData({ wrapStyle });
            }
        },
        observerContentScroll() {
            if (!this.data.sticky) {
                return;
            }
            const { offsetTop } = this.data;
            const { windowHeight } = wx.getSystemInfoSync();
            // @ts-ignore
            this.createIntersectionObserver().disconnect();
            // @ts-ignore
            this.createIntersectionObserver()
                .relativeToViewport({ top: -(this.navHeight + offsetTop) })
                .observe('.van-tabs', (res) => {
                const { top } = res.boundingClientRect;
                if (top > offsetTop) {
                    return;
                }
                const position = res.intersectionRatio > 0 ? 'top' : 'bottom';
                this.$emit('scroll', {
                    scrollTop: top + offsetTop,
                    isFixed: position === 'top'
                });
                this.setPosition(position);
            });
            // @ts-ignore
            this.createIntersectionObserver()
                .relativeToViewport({ bottom: -(windowHeight - 1 - offsetTop) })
                .observe('.van-tabs', (res) => {
                const { top, bottom } = res.boundingClientRect;
                if (bottom < this.navHeight) {
                    return;
                }
                const position = res.intersectionRatio > 0 ? 'top' : '';
                this.$emit('scroll', {
                    scrollTop: top + offsetTop,
                    isFixed: position === 'top'
                });
                this.setPosition(position);
            });
        },
        setPosition(position) {
            if (position !== this.data.position) {
                this.set({ position }).then(() => {
                    this.setWrapStyle();
                });
            }
        }
    }
});
