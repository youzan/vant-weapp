"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../common/component");
var safe_area_1 = require("../mixins/safe-area");
component_1.VantComponent({
    mixins: [safe_area_1.safeArea({ safeAreaInsetTop: true })],
    classes: ['title-class'],
    props: {
        title: String,
        fixed: Boolean,
        leftText: String,
        rightText: String,
        leftArrow: Boolean,
        border: {
            type: Boolean,
            value: true
        },
        zIndex: {
            type: Number,
            value: 120
        }
    },
    methods: {
        onClickLeft: function () {
            this.$emit('click-left');
        },
        onClickRight: function () {
            this.$emit('click-right');
        }
    }
});
