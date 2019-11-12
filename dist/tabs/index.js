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
                i++;
            }
            this.updateTabs(tabs);
        }
    },
    props: {
        color: {
            type: String,
            observer: 'setLine'
        },
        sticky: Boolean,
        animated: {
            type: Boolean,
            observer: 'setTrack'
        },
        swipeable: Boolean,
        lineWidth: {
            type: [String, Number],
            value: -1,
            observer: 'setLine'
        },
        lineHeight: {
            type: [String, Number],
            value: -1,
            observer: 'setLine'
        },
        active: {
            type: [String, Number],
            value: 0,
            observer(value) {
                this.currentName = value;
                this.setActiveTab();
            }
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
            value: 4,
            observer() {
                this.setData({
                    scrollable: this.children.length > this.data.swipeThreshold
                });
            }
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
        currentIndex: 0
    },
    beforeCreate() {
        this.children = [];
    },
    mounted() {
        this.setLine(true);
        this.setTrack();
        this.scrollIntoView();
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
            const computedName = child.getComputedName();
            if (this.data.tabs[index].disabled) {
                this.trigger('disabled', computedName);
            }
            else {
                this.trigger('click', computedName);
                this.setActive(computedName);
            }
        },
        setActive(name) {
            if (name !== this.currentName) {
                this.currentName = name;
                this.trigger('change', name);
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
                const height = lineHeight !== -1
                    ? `height: ${addUnit(lineHeight)}; border-radius: ${addUnit(lineHeight)};`
                    : '';
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
                const { active } = this.data;
                const { children = [] } = this;
                this.currentName =
                    active === '' && children.length
                        ? children[0].getComputedName()
                        : active;
            }
            this.children.forEach((item, index) => {
                const data = {
                    active: item.getComputedName() === this.currentName
                };
                if (data.active) {
                    this.setData({ currentIndex: index });
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
                    const child = this.children[currentIndex - 1];
                    this.setActive(child.getComputedName());
                }
                else if (deltaX < 0 && currentIndex !== tabs.length - 1) {
                    const child = this.children[currentIndex - 1];
                    this.setActive(child.getComputedName());
                }
            }
        }
    }
});
