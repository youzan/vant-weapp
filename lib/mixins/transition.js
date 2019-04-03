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
            show: {
                type: Boolean,
                value: showDefaultValue,
                observer: 'observeShow'
            },
            duration: {
                type: [Number, Object],
                value: 300,
                observer: 'observeDuration'
            },
            name: {
                type: String,
                value: 'fade',
                observer: 'updateClasses'
            }
        },
        data: {
            type: '',
            inited: false,
            display: false,
            classNames: getClassNames('fade')
        },
        attached: function () {
            if (this.data.show) {
                this.show();
            }
        },
        methods: {
            observeShow: function (value) {
                if (value) {
                    this.show();
                }
                else {
                    this.leave();
                }
            },
            updateClasses: function (name) {
                this.set({
                    classNames: getClassNames(name)
                });
            },
            show: function () {
                var _this = this;
                var _a = this.data, classNames = _a.classNames, duration = _a.duration;
                var currentDuration = utils_1.isObj(duration) ? duration.leave : duration;
                Promise.resolve()
                    .then(nextTick)
                    .then(function () {
                    return _this.set({
                        inited: true,
                        display: true,
                        classes: classNames.enter,
                        currentDuration: currentDuration
                    });
                })
                    .then(nextTick)
                    .then(function () {
                    return _this.set({
                        classes: classNames['enter-to']
                    });
                });
            },
            leave: function () {
                var _this = this;
                var _a = this.data, classNames = _a.classNames, duration = _a.duration;
                var currentDuration = utils_1.isObj(duration) ? duration.leave : duration;
                if (+currentDuration === 0) {
                    this.onTransitionEnd();
                    return;
                }
                Promise.resolve()
                    .then(nextTick)
                    .then(function () {
                    return _this.set({
                        classes: classNames.leave,
                        currentDuration: currentDuration
                    });
                })
                    .then(nextTick)
                    .then(function () {
                    return _this.set({
                        classes: classNames['leave-to']
                    });
                });
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
