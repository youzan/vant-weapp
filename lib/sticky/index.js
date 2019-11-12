"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../common/component");
component_1.VantComponent({
    props: {
        zIndex: {
            type: Number,
            value: 99
        },
        offsetTop: {
            type: Number,
            value: 0
        },
        disabled: Boolean
    },
    data: {
        wrapStyle: '',
        containerStyle: ''
    },
    methods: {
        setStyle: function () {
            var _a = this.data, offsetTop = _a.offsetTop, height = _a.height, fixed = _a.fixed, zIndex = _a.zIndex;
            if (fixed) {
                this.setData({
                    wrapStyle: "top: " + offsetTop + "px;",
                    containerStyle: "height: " + height + "px; z-index: " + zIndex + ";"
                });
            }
            else {
                this.setData({
                    wrapStyle: '',
                    containerStyle: ''
                });
            }
        },
        observerContentScroll: function () {
            var _this = this;
            var offsetTop = this.data.offsetTop;
            var intersectionObserver = this.createIntersectionObserver({
                thresholds: [0, 1]
            });
            this.intersectionObserver = intersectionObserver;
            intersectionObserver.relativeToViewport({ top: -offsetTop });
            intersectionObserver.observe('.van-sticky', function (res) {
                if (_this.data.disabled) {
                    return;
                }
                // @ts-ignore
                var _a = res.boundingClientRect, top = _a.top, height = _a.height;
                var fixed = top <= offsetTop;
                _this.$emit('scroll', {
                    scrollTop: top,
                    isFixed: fixed
                });
                _this.setData({ fixed: fixed, height: height });
                wx.nextTick(function () {
                    _this.setStyle();
                });
            });
        }
    },
    mounted: function () {
        this.observerContentScroll();
    },
    destroyed: function () {
        this.intersectionObserver.disconnect();
    }
});
