"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../common/utils");
var getClassNames = function (name) { return ({
    enter: "van-" + name + "-enter van-" + name + "-enter-active enter-class enter-active-class",
    'enter-to': "van-" + name + "-enter-to van-" + name + "-enter-active enter-to-class enter-active-class",
    leave: "van-" + name + "-leave van-" + name + "-leave-active leave-class leave-active-class",
    'leave-to': "van-" + name + "-leave-to van-" + name + "-leave-active leave-to-class leave-active-class"
}); };
var nextTick = function () { return new Promise(function (resolve) { return setTimeout(resolve, 1000 / 30); }); };
exports.transition = function (showDefaultValue) {
    return Behavior({
        properties: {
            customStyle: String,
            // @ts-ignore
            show: {
                type: Boolean,
                value: showDefaultValue,
                observer: 'observeShow'
            },
            // @ts-ignore
            duration: {
                type: [Number, Object],
                value: 300,
                observer: 'observeDuration'
            },
            name: {
                type: String,
                value: 'fade'
            }
        },
        data: {
            type: '',
            inited: false,
            display: false
        },
        attached: function () {
            if (this.data.show) {
                this.enter();
            }
        },
        methods: {
            observeShow: function (value) {
                if (value) {
                    this.enter();
                }
                else {
                    this.leave();
                }
            },
            enter: function () {
                var _this = this;
                var _a = this.data, duration = _a.duration, name = _a.name;
                var classNames = getClassNames(name);
                var currentDuration = utils_1.isObj(duration) ? duration.enter : duration;
                this.status = 'enter';
                Promise.resolve()
                    .then(nextTick)
                    .then(function () {
                    _this.checkStatus('enter');
                    _this.set({
                        inited: true,
                        display: true,
                        classes: classNames.enter,
                        currentDuration: currentDuration
                    });
                })
                    .then(nextTick)
                    .then(function () {
                    _this.checkStatus('enter');
                    _this.set({
                        classes: classNames['enter-to']
                    });
                })
                    .catch(function () { });
            },
            leave: function () {
                var _this = this;
                var _a = this.data, duration = _a.duration, name = _a.name;
                var classNames = getClassNames(name);
                var currentDuration = utils_1.isObj(duration) ? duration.leave : duration;
                this.status = 'leave';
                Promise.resolve()
                    .then(nextTick)
                    .then(function () {
                    _this.checkStatus('leave');
                    _this.set({
                        classes: classNames.leave,
                        currentDuration: currentDuration
                    });
                })
                    .then(function () { return setTimeout(function () { return _this.onTransitionEnd(); }, currentDuration); })
                    .then(nextTick)
                    .then(function () {
                    _this.checkStatus('leave');
                    _this.set({
                        classes: classNames['leave-to']
                    });
                })
                    .catch(function () { });
            },
            checkStatus: function (status) {
                if (status !== this.status) {
                    throw new Error("incongruent status: " + status);
                }
            },
            onTransitionEnd: function () {
                if (!this.data.show) {
                    this.set({ display: false });
                    this.$emit('transitionEnd');
                }
            }
        }
    });
};
