"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../common/component");
var utils_1 = require("../common/utils");
var ARRAY = [];
component_1.VantComponent({
    field: true,
    relation: {
        name: 'dropdown-item',
        type: 'descendant',
        linked: function (target) {
            this.children = this.children || [];
            // 透传 props 给 dropdown-item
            var _a = this.data, overlay = _a.overlay, duration = _a.duration, activeColor = _a.activeColor, closeOnClickOverlay = _a.closeOnClickOverlay, direction = _a.direction;
            this.updateChildData(target, {
                overlay: overlay,
                duration: duration,
                activeColor: activeColor,
                closeOnClickOverlay: closeOnClickOverlay,
                direction: direction,
                childIndex: this.children.length
            });
            this.children.push(target);
            // 收集 dorpdown-item 的 data 挂在 data 上
            target &&
                this.setData({
                    itemListData: this.data.itemListData.concat([target.data])
                });
        },
        unlinked: function (target) {
            this.children = this.children.filter(function (child) { return child !== target; });
        }
    },
    props: {
        activeColor: String,
        overlay: {
            type: Boolean,
            value: true
        },
        zIndex: {
            type: Number,
            value: 10
        },
        duration: {
            type: Number,
            value: 200
        },
        direction: {
            type: String,
            value: 'down'
        },
        closeOnClickOverlay: {
            type: Boolean,
            value: true
        },
        closeOnClickOutside: {
            type: Boolean,
            value: true
        }
    },
    data: {
        itemListData: []
    },
    created: function () {
        ARRAY.push(this);
    },
    destroyed: function () {
        var _this = this;
        ARRAY = ARRAY.filter(function (item) { return item !== _this; });
    },
    methods: {
        updateChildData: function (childItem, newData, needRefreshList) {
            if (needRefreshList === void 0) { needRefreshList = false; }
            childItem.setData(newData);
            if (needRefreshList) {
                // dropdown-item data 更新，涉及到 title 的展示，触发模板更新
                this.setData({ itemListData: this.data.itemListData });
            }
        },
        toggleItem: function (active) {
            var _this = this;
            this.children.forEach(function (item, index) {
                var showPopup = item.data.showPopup;
                if (index === active) {
                    _this.toggleChildItem(item);
                }
                else if (showPopup) {
                    _this.toggleChildItem(item, false, { immediate: true });
                }
            });
        },
        toggleChildItem: function (childItem, show, options) {
            var _this = this;
            if (options === void 0) { options = {}; }
            var _a = childItem.data, showPopup = _a.showPopup, duration = _a.duration;
            if (show === undefined)
                show = !showPopup;
            if (show === showPopup) {
                return;
            }
            var newChildData = { transition: !options.immediate, showPopup: show };
            if (!show) {
                var time = options.immediate ? 0 : duration;
                this.updateChildData(childItem, __assign({}, newChildData), true);
                setTimeout(function () {
                    _this.updateChildData(childItem, { showWrapper: false }, true);
                }, time);
                return;
            }
            this.getChildWrapperStyle().then(function (wrapperStyle) {
                if (wrapperStyle === void 0) { wrapperStyle = ''; }
                _this.updateChildData(childItem, __assign(__assign({}, newChildData), { wrapperStyle: wrapperStyle, showWrapper: true }), true);
            });
        },
        close: function () {
            var _this = this;
            this.children.forEach(function (item) {
                _this.toggleChildItem(item, false, { immediate: true });
            });
        },
        getChildWrapperStyle: function () {
            var windowHeight = wx.getSystemInfoSync().windowHeight;
            var _a = this.data, zIndex = _a.zIndex, direction = _a.direction;
            var offset = 0;
            return this.getRect('.van-dropdown-menu').then(function (rect) {
                var _a = rect.top, top = _a === void 0 ? 0 : _a, _b = rect.bottom, bottom = _b === void 0 ? 0 : _b;
                if (direction === 'down') {
                    offset = bottom;
                }
                else {
                    offset = windowHeight - top;
                }
                var wrapperStyle = "z-index: " + zIndex + ";";
                if (direction === 'down') {
                    wrapperStyle += "top: " + utils_1.addUnit(offset) + ";";
                }
                else {
                    wrapperStyle += "bottom: " + utils_1.addUnit(offset) + ";";
                }
                return Promise.resolve(wrapperStyle);
            });
        },
        onTitleTap: function (event) {
            var _this = this;
            // item ---> dropdown-item
            var _a = event.currentTarget.dataset, item = _a.item, index = _a.index;
            if (!item.disabled) {
                // menuItem ---> dropdown-menu
                ARRAY.forEach(function (menuItem) {
                    if (menuItem && menuItem.data.closeOnClickOutside && menuItem !== _this) {
                        menuItem.close();
                    }
                });
                this.toggleItem(index);
            }
        }
    }
});
