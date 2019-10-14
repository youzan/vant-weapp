"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../common/component");
var utils_1 = require("../common/utils");
component_1.VantComponent({
    props: {
        zIndex: {
            type: Number,
            value: 99
        },
        offsetTop: {
            type: Number,
            value: 0
        }
    },
    data: {
        position: '',
        height: 0,
        wrapStyle: '',
        containerStyle: ''
    },
    methods: {
        setWrapStyle: function () {
            var _a = this.data, offsetTop = _a.offsetTop, position = _a.position;
            var wrapStyle;
            var containerStyle;
            switch (position) {
                case 'top':
                    wrapStyle = "\n            top: " + offsetTop + "px;\n            position: fixed;\n          ";
                    containerStyle = "height: " + this.itemHeight + "px;";
                    break;
                case 'bottom':
                    wrapStyle = "\n            top: auto;\n            bottom: 0;\n          ";
                    containerStyle = '';
                    break;
                default:
                    wrapStyle = '';
                    containerStyle = '';
            }
            var data = {};
            if (wrapStyle !== this.data.wrapStyle) {
                data.wrapStyle = wrapStyle;
            }
            if (containerStyle !== this.data.containerStyle) {
                data.containerStyle = containerStyle;
            }
            if (JSON.stringify(data) !== '{}') {
                this.setData(data);
            }
        },
        setPosition: function (position) {
            var _this = this;
            if (position !== this.data.position) {
                this.setData({ position: position });
                utils_1.nextTick(function () {
                    _this.setWrapStyle();
                });
            }
        },
        observerContentScroll: function () {
            var _this = this;
            var _a = this.data.offsetTop, offsetTop = _a === void 0 ? 0 : _a;
            var windowHeight = wx.getSystemInfoSync().windowHeight;
            this.createIntersectionObserver({}).disconnect();
            // @ts-ignore
            this.createIntersectionObserver()
                .relativeToViewport({ top: -(this.itemHeight + offsetTop) })
                .observe('.van-sticky', function (res) {
                var top = res.boundingClientRect.top;
                if (top > offsetTop) {
                    return;
                }
                var position = 'top';
                _this.$emit('scroll', {
                    scrollTop: top + offsetTop,
                    isFixed: true
                });
                _this.setPosition(position);
            });
            // @ts-ignore
            this.createIntersectionObserver()
                .relativeToViewport({ bottom: -(windowHeight - 1 - offsetTop) })
                .observe('.van-sticky', function (res) {
                var _a = res.boundingClientRect, top = _a.top, bottom = _a.bottom;
                if (bottom <= _this.itemHeight - 1) {
                    return;
                }
                var position = res.intersectionRatio > 0 ? 'top' : '';
                _this.$emit('scroll', {
                    scrollTop: top + offsetTop,
                    isFixed: position === 'top'
                });
                _this.setPosition(position);
            });
        }
    },
    mounted: function () {
        var _this = this;
        this.getRect('.van-sticky').then(function (rect) {
            _this.itemHeight = rect.height;
            _this.itemTop = rect.top;
            _this.observerContentScroll();
        });
    },
    destroyed: function () {
        this.createIntersectionObserver({}).disconnect();
    }
});
