"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../common/component");
var touch_1 = require("../mixins/touch");
var THRESHOLD = 0.3;
component_1.VantComponent({
    props: {
        disabled: Boolean,
        leftWidth: {
            type: Number,
            value: 0
        },
        rightWidth: {
            type: Number,
            value: 0
        },
        asyncClose: Boolean
    },
    mixins: [touch_1.touch],
    data: {
        catchMove: false
    },
    created: function () {
        this.offset = 0;
    },
    methods: {
        open: function (position) {
            var _a = this.data, leftWidth = _a.leftWidth, rightWidth = _a.rightWidth;
            var offset = position === 'left' ? leftWidth : -rightWidth;
            this.swipeMove(offset);
        },
        close: function () {
            this.swipeMove(0);
        },
        swipeMove: function (offset) {
            if (offset === void 0) { offset = 0; }
            this.offset = offset;
            var transform = "translate3d(" + offset + "px, 0, 0)";
            var transition = this.draging
                ? 'none'
                : '.6s cubic-bezier(0.18, 0.89, 0.32, 1)';
            this.set({
                wrapperStyle: "\n        -webkit-transform: " + transform + ";\n        -webkit-transition: " + transition + ";\n        transform: " + transform + ";\n        transition: " + transition + ";\n      "
            });
        },
        swipeLeaveTransition: function () {
            var _a = this.data, leftWidth = _a.leftWidth, rightWidth = _a.rightWidth;
            var offset = this.offset;
            if (rightWidth > 0 && -offset > rightWidth * THRESHOLD) {
                this.open('right');
            }
            else if (leftWidth > 0 && offset > leftWidth * THRESHOLD) {
                this.open('left');
            }
            else {
                this.swipeMove(0);
            }
            this.set({ catchMove: false });
        },
        startDrag: function (event) {
            if (this.data.disabled) {
                return;
            }
            this.draging = true;
            this.startOffset = this.offset;
            this.firstDirection = '';
            this.touchStart(event);
        },
        noop: function () { },
        onDrag: function (event) {
            if (this.data.disabled) {
                return;
            }
            this.touchMove(event);
            if (!this.firstDirection) {
                this.firstDirection = this.direction;
                this.set({ catchMove: this.firstDirection === 'horizontal' });
            }
            if (this.firstDirection === 'vertical') {
                return;
            }
            var _a = this.data, leftWidth = _a.leftWidth, rightWidth = _a.rightWidth;
            var offset = this.startOffset + this.deltaX;
            if ((rightWidth > 0 && -offset > rightWidth) ||
                (leftWidth > 0 && offset > leftWidth)) {
                return;
            }
            this.swipeMove(offset);
        },
        endDrag: function () {
            if (this.data.disabled) {
                return;
            }
            this.draging = false;
            this.swipeLeaveTransition();
        },
        onClick: function (event) {
            var _a = event.currentTarget.dataset.key, position = _a === void 0 ? 'outside' : _a;
            this.$emit('click', position);
            if (!this.offset) {
                return;
            }
            if (this.data.asyncClose) {
                this.$emit('close', { position: position, instance: this });
            }
            else {
                this.swipeMove(0);
            }
        }
    }
});
