"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("../common/component");
var touch_1 = require("../mixins/touch");
var THRESHOLD = 0.15;
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
        offset: 0,
        draging: false
    },
    computed: {
        wrapperStyle: function () {
            var _a = this.data, offset = _a.offset, draging = _a.draging;
            var transform = "translate3d(" + offset + "px, 0, 0)";
            var transition = draging ? 'none' : '.6s cubic-bezier(0.18, 0.89, 0.32, 1)';
            return "\n        -webkit-transform: " + transform + ";\n        -webkit-transition: " + transition + ";\n        transform: " + transform + ";\n        transition: " + transition + ";\n      ";
        }
    },
    methods: {
        onTransitionend: function () {
            this.swipe = false;
        },
        open: function (position) {
            var _a = this.data, leftWidth = _a.leftWidth, rightWidth = _a.rightWidth;
            var offset = position === 'left' ? leftWidth : -rightWidth;
            this.swipeMove(offset);
            this.resetSwipeStatus();
        },
        close: function () {
            this.set({ offset: 0 });
        },
        resetSwipeStatus: function () {
            this.swiping = false;
            this.opened = true;
        },
        swipeMove: function (offset) {
            if (offset === void 0) { offset = 0; }
            this.set({ offset: offset });
            offset && (this.swiping = true);
            !offset && (this.opened = false);
        },
        swipeLeaveTransition: function (direction) {
            var _a = this.data, offset = _a.offset, leftWidth = _a.leftWidth, rightWidth = _a.rightWidth;
            var threshold = this.opened ? 1 - THRESHOLD : THRESHOLD;
            // right
            if (direction > 0 && -offset > rightWidth * threshold && rightWidth > 0) {
                this.open('right');
                // left
            }
            else if (direction < 0 && offset > leftWidth * threshold && leftWidth > 0) {
                this.open('left');
            }
            else {
                this.swipeMove();
            }
        },
        startDrag: function (event) {
            if (this.data.disabled) {
                return;
            }
            this.set({ draging: true });
            this.touchStart(event);
            if (this.opened) {
                this.startX -= this.data.offset;
            }
        },
        onDrag: function (event) {
            if (this.data.disabled) {
                return;
            }
            this.touchMove(event);
            var deltaX = this.deltaX;
            var _a = this.data, leftWidth = _a.leftWidth, rightWidth = _a.rightWidth;
            if ((deltaX < 0 && (-deltaX > rightWidth || !rightWidth)) ||
                (deltaX > 0 && (deltaX > leftWidth || (deltaX > 0 && !leftWidth)))) {
                return;
            }
            if (this.direction === 'horizontal') {
                this.swipeMove(deltaX);
            }
        },
        endDrag: function () {
            if (this.data.disabled) {
                return;
            }
            this.set({ draging: false });
            if (this.swiping) {
                this.swipeLeaveTransition(this.data.offset > 0 ? -1 : 1);
            }
        },
        onClick: function (event) {
            var _a = event.currentTarget.dataset.key, position = _a === void 0 ? 'outside' : _a;
            this.$emit('click', position);
            if (!this.data.offset) {
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
