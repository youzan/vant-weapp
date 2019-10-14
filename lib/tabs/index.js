"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../common/component");
var touch_1 = require("../mixins/touch");
var utils_1 = require("../common/utils");
component_1.VantComponent({
    mixins: [touch_1.touch],
    classes: ['nav-class', 'tab-class', 'tab-active-class', 'line-class'],
    relation: {
        name: 'tab',
        type: 'descendant',
        linked: function (child) {
            child.index = this.children.length;
            child.setComputedName();
            this.children.push(child);
            this.updateTabs(this.data.tabs.concat(child.data));
        },
        unlinked: function (child) {
            var index = this.children.indexOf(child);
            var tabs = this.data.tabs;
            tabs.splice(index, 1);
            this.children.splice(index, 1);
            var i = index;
            while (i >= 0 && i < this.children.length) {
                var currentChild = this.children[i];
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
        swipeThreshold: function () {
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
    beforeCreate: function () {
        this.children = [];
    },
    mounted: function () {
        var _this = this;
        this.setLine(true);
        this.setTrack();
        this.scrollIntoView();
        this.getRect('.van-tabs__wrap').then(function (rect) {
            _this.navHeight = rect.height;
            _this.observerContentScroll();
        });
    },
    destroyed: function () {
        // @ts-ignore
        this.createIntersectionObserver().disconnect();
    },
    methods: {
        updateTabs: function (tabs) {
            tabs = tabs || this.data.tabs;
            this.setData({
                tabs: tabs,
                scrollable: tabs.length > this.data.swipeThreshold
            });
            this.setActiveTab();
        },
        trigger: function (eventName, name) {
            var _a = this.data, tabs = _a.tabs, currentIndex = _a.currentIndex;
            this.$emit(eventName, {
                name: name,
                title: tabs[currentIndex].title
            });
        },
        onTap: function (event) {
            var index = event.currentTarget.dataset.index;
            var child = this.children[index];
            if (this.data.tabs[index].disabled) {
                this.trigger('disabled', child.computedName);
            }
            else {
                this.trigger('click', child.computedName);
                this.setActive(child.computedName);
            }
        },
        setActive: function (computedName) {
            if (computedName !== this.currentName) {
                this.currentName = computedName;
                this.trigger('change', computedName);
                this.setActiveTab();
            }
        },
        setLine: function (skipTransition) {
            var _this = this;
            if (this.data.type !== 'line') {
                return;
            }
            var _a = this.data, color = _a.color, duration = _a.duration, currentIndex = _a.currentIndex, lineWidth = _a.lineWidth, lineHeight = _a.lineHeight;
            this.getRect('.van-tab', true).then(function (rects) {
                var rect = rects[currentIndex];
                var width = lineWidth !== -1 ? lineWidth : rect.width / 2;
                var height = lineHeight !== -1 ? "height: " + utils_1.addUnit(lineHeight) + "; border-radius: " + utils_1.addUnit(lineHeight) + ";" : '';
                var left = rects
                    .slice(0, currentIndex)
                    .reduce(function (prev, curr) { return prev + curr.width; }, 0);
                left += (rect.width - width) / 2;
                var transition = skipTransition
                    ? ''
                    : "transition-duration: " + duration + "s; -webkit-transition-duration: " + duration + "s;";
                _this.setData({
                    lineStyle: "\n            " + height + "\n            width: " + utils_1.addUnit(width) + ";\n            background-color: " + color + ";\n            -webkit-transform: translateX(" + left + "px);\n            transform: translateX(" + left + "px);\n            " + transition + "\n          "
                });
            });
        },
        setTrack: function () {
            var _this = this;
            var _a = this.data, animated = _a.animated, duration = _a.duration, currentIndex = _a.currentIndex;
            if (!animated)
                return '';
            this.getRect('.van-tabs__content').then(function (rect) {
                var width = rect.width;
                _this.setData({
                    trackStyle: "\n              width: " + width * _this.children.length + "px;\n              left: " + -1 * currentIndex * width + "px;\n              transition: left " + duration + "s;\n              display: -webkit-box;\n              display: flex;\n            "
                });
                var data = { width: width, animated: animated };
                _this.children.forEach(function (item) {
                    item.setData(data);
                });
            });
        },
        setActiveTab: function () {
            var _this = this;
            if (!utils_1.isDef(this.currentName)) {
                this.currentName = this.data.active || (this.children[0] || {}).computedName;
            }
            this.children.forEach(function (item, index) {
                var data = {
                    active: item.computedName === _this.currentName
                };
                if (data.active) {
                    _this.setData({
                        currentIndex: index
                    });
                    data.inited = true;
                }
                if (data.active !== item.data.active) {
                    item.setData(data);
                }
            });
            utils_1.nextTick(function () {
                _this.setLine();
                _this.setTrack();
                _this.scrollIntoView();
            });
        },
        // scroll active tab into view
        scrollIntoView: function () {
            var _this = this;
            var _a = this.data, currentIndex = _a.currentIndex, scrollable = _a.scrollable;
            if (!scrollable) {
                return;
            }
            Promise.all([
                this.getRect('.van-tab', true),
                this.getRect('.van-tabs__nav')
            ]).then(function (_a) {
                var tabRects = _a[0], navRect = _a[1];
                var tabRect = tabRects[currentIndex];
                var offsetLeft = tabRects
                    .slice(0, currentIndex)
                    .reduce(function (prev, curr) { return prev + curr.width; }, 0);
                _this.setData({
                    scrollLeft: offsetLeft - (navRect.width - tabRect.width) / 2
                });
            });
        },
        onTouchStart: function (event) {
            if (!this.data.swipeable)
                return;
            this.touchStart(event);
        },
        onTouchMove: function (event) {
            if (!this.data.swipeable)
                return;
            this.touchMove(event);
        },
        // watch swipe touch end
        onTouchEnd: function () {
            if (!this.data.swipeable)
                return;
            var _a = this.data, tabs = _a.tabs, currentIndex = _a.currentIndex;
            var _b = this, direction = _b.direction, deltaX = _b.deltaX, offsetX = _b.offsetX;
            var minSwipeDistance = 50;
            if (direction === 'horizontal' && offsetX >= minSwipeDistance) {
                if (deltaX > 0 && currentIndex !== 0) {
                    this.setActive(this.children[currentIndex - 1].computedName);
                }
                else if (deltaX < 0 && currentIndex !== tabs.length - 1) {
                    this.setActive(this.children[currentIndex + 1].computedName);
                }
            }
        },
        setWrapStyle: function () {
            var _a = this.data, offsetTop = _a.offsetTop, position = _a.position;
            var wrapStyle;
            switch (position) {
                case 'top':
                    wrapStyle = "\n            top: " + offsetTop + "px;\n            position: fixed;\n          ";
                    break;
                case 'bottom':
                    wrapStyle = "\n            top: auto;\n            bottom: 0;\n          ";
                    break;
                default:
                    wrapStyle = '';
            }
            if (wrapStyle !== this.data.wrapStyle) {
                this.setData({ wrapStyle: wrapStyle });
            }
        },
        observerContentScroll: function () {
            var _this = this;
            if (!this.data.sticky) {
                return;
            }
            var offsetTop = this.data.offsetTop;
            var windowHeight = wx.getSystemInfoSync().windowHeight;
            // @ts-ignore
            this.createIntersectionObserver().disconnect();
            // @ts-ignore
            this.createIntersectionObserver()
                .relativeToViewport({ top: -(this.navHeight + offsetTop) })
                .observe('.van-tabs', function (res) {
                var top = res.boundingClientRect.top;
                if (top > offsetTop) {
                    return;
                }
                var position = res.intersectionRatio > 0 ? 'top' : 'bottom';
                _this.$emit('scroll', {
                    scrollTop: top + offsetTop,
                    isFixed: position === 'top'
                });
                _this.setPosition(position);
            });
            // @ts-ignore
            this.createIntersectionObserver()
                .relativeToViewport({ bottom: -(windowHeight - 1 - offsetTop) })
                .observe('.van-tabs', function (res) {
                var _a = res.boundingClientRect, top = _a.top, bottom = _a.bottom;
                if (bottom < _this.navHeight) {
                    return;
                }
                var position = res.intersectionRatio > 0 ? 'top' : '';
                _this.$emit('scroll', {
                    scrollTop: top + offsetTop,
                    isFixed: position === 'top'
                });
                _this.setPosition(position);
            });
        },
        setPosition: function (position) {
            var _this = this;
            if (position !== this.data.position) {
                this.set({ position: position }).then(function () {
                    _this.setWrapStyle();
                });
            }
        }
    }
});
