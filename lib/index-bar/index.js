"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../common/component");
var color_1 = require("../common/color");
var indexList = function () {
    var indexList = [];
    var charCodeOfA = 'A'.charCodeAt(0);
    for (var i = 0; i < 26; i++) {
        indexList.push(String.fromCharCode(charCodeOfA + i));
    }
    return indexList;
};
component_1.VantComponent({
    relation: {
        name: 'index-anchor',
        type: 'descendant',
        linked: function () {
            this.updateData();
        },
        linkChanged: function () {
            this.updateData();
        },
        unlinked: function () {
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
            value: color_1.GREEN
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
        updateData: function () {
            var _this = this;
            this.timer && clearTimeout(this.timer);
            this.timer = setTimeout(function () {
                _this.children = _this.getRelationNodes('../index-anchor/index');
                _this.setData({
                    showSidebar: !!_this.children.length
                });
                _this.setRect().then(function () {
                    _this.onScroll();
                });
            }, 0);
        },
        setRect: function () {
            return Promise.all([
                this.setAnchorsRect(),
                this.setListRect(),
                this.setSiderbarRect()
            ]);
        },
        setAnchorsRect: function () {
            var _this = this;
            return Promise.all(this.children.map(function (anchor) {
                return anchor
                    .getRect('.van-index-anchor-wrapper')
                    .then(function (rect) {
                    Object.assign(anchor, {
                        height: rect.height,
                        top: rect.top + _this.data.scrollTop
                    });
                });
            }));
        },
        setListRect: function () {
            var _this = this;
            return this.getRect('.van-index-bar').then(function (rect) {
                Object.assign(_this, {
                    height: rect.height,
                    top: rect.top + _this.data.scrollTop
                });
            });
        },
        setSiderbarRect: function () {
            var _this = this;
            return this.getRect('.van-index-bar__sidebar').then(function (res) {
                _this.sidebar = {
                    height: res.height,
                    top: res.top
                };
            });
        },
        setDiffData: function (_a) {
            var target = _a.target, data = _a.data;
            var diffData = {};
            Object.keys(data).forEach(function (key) {
                if (target.data[key] !== data[key]) {
                    diffData[key] = data[key];
                }
            });
            if (Object.keys(diffData).length) {
                target.setData(diffData);
            }
        },
        getAnchorRect: function (anchor) {
            return anchor
                .getRect('.van-index-anchor-wrapper')
                .then(function (rect) { return ({
                height: rect.height,
                top: rect.top
            }); });
        },
        getActiveAnchorIndex: function () {
            var children = this.children;
            var _a = this.data, sticky = _a.sticky, scrollTop = _a.scrollTop, stickyOffsetTop = _a.stickyOffsetTop;
            for (var i = this.children.length - 1; i >= 0; i--) {
                var preAnchorHeight = i > 0 ? children[i - 1].height : 0;
                var reachTop = sticky ? preAnchorHeight + stickyOffsetTop : 0;
                if (reachTop + scrollTop >= children[i].top) {
                    return i;
                }
            }
            return -1;
        },
        onScroll: function () {
            var _this = this;
            var _a = this.children, children = _a === void 0 ? [] : _a;
            if (!children.length) {
                return;
            }
            var _b = this.data, sticky = _b.sticky, stickyOffsetTop = _b.stickyOffsetTop, zIndex = _b.zIndex, highlightColor = _b.highlightColor, scrollTop = _b.scrollTop;
            var active = this.getActiveAnchorIndex();
            this.setDiffData({
                target: this,
                data: {
                    activeAnchorIndex: active
                }
            });
            if (sticky) {
                var isActiveAnchorSticky_1 = false;
                if (active !== -1) {
                    isActiveAnchorSticky_1 =
                        children[active].top <= stickyOffsetTop + scrollTop;
                }
                children.forEach(function (item, index) {
                    if (index === active) {
                        var wrapperStyle = '';
                        var anchorStyle = "\n              color: " + highlightColor + ";\n            ";
                        if (isActiveAnchorSticky_1) {
                            wrapperStyle = "\n                height: " + children[index].height + "px;\n              ";
                            anchorStyle = "\n                position: fixed;\n                top: " + stickyOffsetTop + "px;\n                z-index: " + zIndex + ";\n                color: " + highlightColor + ";\n              ";
                        }
                        _this.setDiffData({
                            target: item,
                            data: {
                                active: true,
                                anchorStyle: anchorStyle,
                                wrapperStyle: wrapperStyle
                            }
                        });
                    }
                    else if (index === active - 1) {
                        var currentAnchor = children[index];
                        var currentOffsetTop = currentAnchor.top;
                        var targetOffsetTop = index === children.length - 1
                            ? _this.top
                            : children[index + 1].top;
                        var parentOffsetHeight = targetOffsetTop - currentOffsetTop;
                        var translateY = parentOffsetHeight - currentAnchor.height;
                        var anchorStyle = "\n              position: relative;\n              transform: translate3d(0, " + translateY + "px, 0);\n              z-index: " + zIndex + ";\n              color: " + highlightColor + ";\n            ";
                        _this.setDiffData({
                            target: item,
                            data: {
                                active: true,
                                anchorStyle: anchorStyle
                            }
                        });
                    }
                    else {
                        _this.setDiffData({
                            target: item,
                            data: {
                                active: false,
                                anchorStyle: '',
                                wrapperStyle: ''
                            }
                        });
                    }
                });
            }
        },
        onClick: function (event) {
            this.scrollToAnchor(event.target.dataset.index);
        },
        onTouchMove: function (event) {
            var sidebarLength = this.children.length;
            var touch = event.touches[0];
            var itemHeight = this.sidebar.height / sidebarLength;
            var index = Math.floor((touch.clientY - this.sidebar.top) / itemHeight);
            if (index < 0) {
                index = 0;
            }
            else if (index > sidebarLength - 1) {
                index = sidebarLength - 1;
            }
            this.scrollToAnchor(index);
        },
        onTouchStop: function () {
            this.scrollToAnchorIndex = null;
        },
        scrollToAnchor: function (index) {
            var _this = this;
            if (typeof index !== 'number' || this.scrollToAnchorIndex === index) {
                return;
            }
            this.scrollToAnchorIndex = index;
            var anchor = this.children.find(function (item) {
                return item.data.index === _this.data.indexList[index];
            });
            if (anchor) {
                this.$emit('select', anchor.data.index);
                wx.pageScrollTo({
                    duration: 0,
                    scrollTop: anchor.top
                });
            }
        }
    }
});
