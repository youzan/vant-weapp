"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../common/component");
component_1.VantComponent({
    field: true,
    relation: {
        name: 'dropdown-menu',
        type: 'ancestor',
        linked: function (target) {
            this.parent = target;
            this.updateDataFromParent();
        },
        unlinked: function () {
            this.parent = null;
        }
    },
    props: {
        value: {
            type: null,
            observer: 'rerender'
        },
        title: {
            type: String,
            observer: 'rerender'
        },
        disabled: Boolean,
        titleClass: {
            type: String,
            observer: 'rerender'
        },
        options: {
            type: Array,
            value: [],
            observer: 'rerender'
        }
    },
    data: {
        transition: true,
        showPopup: false,
        showWrapper: false,
        displayTitle: ''
    },
    methods: {
        rerender: function () {
            var _this = this;
            wx.nextTick(function () {
                _this.parent && _this.parent.updateItemListData();
            });
        },
        updateDataFromParent: function () {
            if (this.parent) {
                var _a = this.parent.data, overlay = _a.overlay, duration = _a.duration, activeColor = _a.activeColor, closeOnClickOverlay = _a.closeOnClickOverlay, direction = _a.direction;
                this.setData({
                    overlay: overlay,
                    duration: duration,
                    activeColor: activeColor,
                    closeOnClickOverlay: closeOnClickOverlay,
                    direction: direction
                });
            }
        },
        onClickOverlay: function () {
            this.toggle();
            this.$emit('close');
        },
        onOptionTap: function (event) {
            var _this = this;
            var option = event.currentTarget.dataset.option;
            var value = option.value;
            var shouldEmitChange = this.data.value !== value;
            this.setData({ showPopup: false, value: value });
            setTimeout(function () {
                _this.setData({ showWrapper: false });
            }, this.data.duration || 0);
            this.rerender();
            if (shouldEmitChange) {
                this.$emit('change', value);
            }
        },
        toggle: function (show, options) {
            var _this = this;
            if (options === void 0) { options = {}; }
            var _a = this.data, showPopup = _a.showPopup, duration = _a.duration;
            if (show == null) {
                show = !showPopup;
            }
            if (show === showPopup) {
                return;
            }
            if (!show) {
                var time = options.immediate ? 0 : duration;
                this.setData({ transition: !options.immediate, showPopup: show });
                setTimeout(function () {
                    _this.setData({ showWrapper: false });
                }, time);
                this.rerender();
                return;
            }
            this.parent.getChildWrapperStyle().then(function (wrapperStyle) {
                if (wrapperStyle === void 0) { wrapperStyle = ''; }
                _this.setData({
                    transition: !options.immediate,
                    showPopup: show,
                    wrapperStyle: wrapperStyle,
                    showWrapper: true
                });
                _this.rerender();
            });
        }
    }
});
