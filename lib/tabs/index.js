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
            observer: function (value) {
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
            observer: function () {
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
    beforeCreate: function () {
        this.children = [];
    },
    mounted: function () {
        this.setLine(true);
        this.setTrack();
        this.scrollIntoView();
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
            var computedName = child.getComputedName();
            if (this.data.tabs[index].disabled) {
                this.trigger('disabled', computedName);
            }
            else {
                this.trigger('click', computedName);
                this.setActive(computedName);
            }
        },
        setActive: function (name) {
            if (name !== this.currentName) {
                this.currentName = name;
                this.trigger('change', name);
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
                var height = lineHeight !== -1
                    ? "height: " + utils_1.addUnit(lineHeight) + "; border-radius: " + utils_1.addUnit(lineHeight) + ";"
                    : '';
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
                var active = this.data.active;
                var _a = this.children, children = _a === void 0 ? [] : _a;
                this.currentName =
                    active === '' && children.length
                        ? children[0].getComputedName()
                        : active;
            }
            this.children.forEach(function (item, index) {
                var data = {
                    active: item.getComputedName() === _this.currentName
                };
                if (data.active) {
                    _this.setData({ currentIndex: index });
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
                    var child = this.children[currentIndex - 1];
                    this.setActive(child.getComputedName());
                }
                else if (deltaX < 0 && currentIndex !== tabs.length - 1) {
                    var child = this.children[currentIndex - 1];
                    this.setActive(child.getComputedName());
                }
            }
        }
    }
});
