"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../common/utils");
var component_1 = require("../common/component");
var button_1 = require("../mixins/button");
var open_type_1 = require("../mixins/open-type");
component_1.VantComponent({
    mixins: [button_1.button, open_type_1.openType],
    classes: ['custom-class', 'loading-class', 'error-class', 'image-class'],
    props: {
        src: String,
        width: String,
        height: String,
        fit: {
            type: String,
            value: 'fill'
        },
        round: Boolean,
        lazyLoad: Boolean,
        showError: {
            type: Boolean,
            value: true
        },
        showLoading: {
            type: Boolean,
            value: true
        },
        showMenuByLongpress: Boolean,
        // 受小程序slot限制所需要的属性
        useLoadingSlot: Boolean,
        useErrorSlot: Boolean,
    },
    data: {
        fitWeapp: 'aspectFit',
        FIT_MODE_MAP: {
            contain: 'aspectFit',
            cover: 'aspectFill',
            fill: 'scaleToFill',
            none: 'center',
            // TODO: 这个没有原生的属性，需要后面实现，暂时先用contain;
            'scale-down': 'aspectFit'
        },
        loading: true,
        error: false
    },
    watch: {
        src: function () {
            this.setData({
                loading: true,
                error: false
            });
        }
    },
    mounted: function () {
        this.init();
    },
    methods: {
        init: function () {
            var _a = this.data, FIT_MODE_MAP = _a.FIT_MODE_MAP, fit = _a.fit;
            this.setData({
                mode: FIT_MODE_MAP[fit],
                style: this.getStyle(),
            });
        },
        getStyle: function () {
            var _a = this.data, width = _a.width, height = _a.height;
            var style = '';
            if (utils_1.isDef(width)) {
                style += "width: " + utils_1.addUnit(width) + ";";
            }
            if (utils_1.isDef(height)) {
                style += "height: " + utils_1.addUnit(height) + ";";
            }
            return style;
        },
        onLoad: function (event) {
            this.setData({
                loading: false
            });
            this.$emit('load', event.detail);
        },
        onError: function (event) {
            this.setData({
                loading: false,
                error: true,
            });
            this.$emit('error', event.detail);
        },
        onClick: function (event) {
            this.$emit('click', event.detail);
        },
    }
});
