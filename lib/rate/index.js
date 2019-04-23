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
component_1.VantComponent({
    field: true,
    classes: ['icon-class'],
    props: {
        readonly: Boolean,
        disabled: Boolean,
        size: {
            type: Number,
            value: 20
        },
        icon: {
            type: String,
            value: 'star'
        },
        voidIcon: {
            type: String,
            value: 'star-o'
        },
        color: {
            type: String,
            value: '#ffd21e'
        },
        voidColor: {
            type: String,
            value: '#c7c7c7'
        },
        disabledColor: {
            type: String,
            value: '#bdbdbd'
        },
        count: {
            type: Number,
            value: 5
        },
        value: {
            type: Number,
            value: 0
        }
    },
    data: {
        innerValue: 0
    },
    watch: {
        value: function (value) {
            if (value !== this.data.innerValue) {
                this.set({ innerValue: value });
            }
        }
    },
    computed: {
        list: function () {
            var _a = this.data, count = _a.count, innerValue = _a.innerValue;
            return Array.from({ length: count }, function (_, index) { return index < innerValue; });
        }
    },
    methods: {
        onSelect: function (event) {
            var data = this.data;
            var index = event.currentTarget.dataset.index;
            if (!data.disabled && !data.readonly) {
                this.set({ innerValue: index + 1 });
                this.$emit('input', index + 1);
                this.$emit('change', index + 1);
            }
        },
        onTouchMove: function (event) {
            var _this = this;
            var _a = event.touches[0], clientX = _a.clientX, clientY = _a.clientY;
            this.getRect('.van-rate__item', true).then(function (list) {
                var target = list.find(function (item) {
                    return clientX >= item.left &&
                        clientX <= item.right &&
                        clientY >= item.top &&
                        clientY <= item.bottom;
                });
                if (target != null) {
                    _this.onSelect(__assign({}, event, { currentTarget: target }));
                }
            });
        }
    }
});
