"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../common/component");
var ROOT_ELEMENT = '.van-sticky';
component_1.VantComponent({
    props: {
        zIndex: {
            type: Number,
            value: 99
        },
        offsetTop: {
            type: Number,
            value: 0,
            observer: 'observeContent'
        },
        disabled: {
            type: Boolean,
            observer: function (value) {
                if (!this.mounted) {
                    return;
                }
                value ? this.disconnectObserver() : this.initObserver();
            }
        },
        container: {
            type: null,
            observer: function (target) {
                if (typeof target !== 'function' || !this.data.height) {
                    return;
                }
                this.observeContainer();
            }
        }
    },
    data: {
        height: 0,
        fixed: false
    },
    methods: {
        getContainerRect: function () {
            var nodesRef = this.data.container();
            return new Promise(function (resolve) {
                return nodesRef.boundingClientRect(resolve).exec();
            });
        },
        initObserver: function () {
            var _this = this;
            this.disconnectObserver();
            this.getRect(ROOT_ELEMENT).then(function (rect) {
                _this.setData({ height: rect.height });
                wx.nextTick(function () {
                    _this.observeContent();
                    _this.observeContainer();
                });
            });
        },
        disconnectObserver: function (observerName) {
            if (observerName) {
                var observer = this[observerName];
                observer && observer.disconnect();
            }
            else {
                this.contentObserver && this.contentObserver.disconnect();
                this.containerObserver && this.containerObserver.disconnect();
            }
        },
        observeContent: function () {
            var _this = this;
            var offsetTop = this.data.offsetTop;
            this.disconnectObserver('contentObserver');
            var contentObserver = this.createIntersectionObserver({
                thresholds: [0.9, 1]
            });
            contentObserver.relativeToViewport({ top: -offsetTop });
            contentObserver.observe(ROOT_ELEMENT, function (res) {
                if (_this.data.disabled) {
                    return;
                }
                _this.setFixed(res.boundingClientRect.top);
            });
            this.contentObserver = contentObserver;
        },
        observeContainer: function () {
            var _this = this;
            if (typeof this.data.container !== 'function') {
                return;
            }
            var height = this.data.height;
            this.getContainerRect().then(function (rect) {
                _this.containerHeight = rect.height;
                _this.disconnectObserver('containerObserver');
                var containerObserver = _this.createIntersectionObserver({
                    thresholds: [0.9, 1]
                });
                _this.containerObserver = containerObserver;
                containerObserver.relativeToViewport({
                    top: _this.containerHeight - height
                });
                containerObserver.observe(ROOT_ELEMENT, function (res) {
                    if (_this.data.disabled) {
                        return;
                    }
                    _this.setFixed(res.boundingClientRect.top);
                });
            });
        },
        setFixed: function (top) {
            var _a = this.data, offsetTop = _a.offsetTop, height = _a.height;
            var containerHeight = this.containerHeight;
            var fixed = containerHeight && height
                ? top >= height - containerHeight && top < offsetTop
                : top < offsetTop;
            this.$emit('scroll', {
                scrollTop: top,
                isFixed: fixed
            });
            this.setData({ fixed: fixed });
        }
    },
    mounted: function () {
        this.mounted = true;
        if (!this.data.disabled) {
            this.initObserver();
        }
    },
    destroyed: function () {
        this.disconnectObserver();
    }
});
