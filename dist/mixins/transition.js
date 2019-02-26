import { isObj } from '../common/utils';

var getClassNames = function getClassNames(name) {
  return {
    enter: "van-" + name + "-enter van-" + name + "-enter-active enter-class enter-active-class",
    'enter-to': "van-" + name + "-enter-to van-" + name + "-enter-active enter-to-class enter-active-class",
    leave: "van-" + name + "-leave van-" + name + "-leave-active leave-class leave-active-class",
    'leave-to': "van-" + name + "-leave-to van-" + name + "-leave-active leave-to-class leave-active-class"
  };
};

var requestAnimationFrame = function requestAnimationFrame(cb) {
  return setTimeout(cb, 1000 / 60);
};

export var transition = function transition(showDefaultValue) {
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
    attached: function attached() {
      if (this.data.show) {
        this.show();
      }
    },
    methods: {
      observeShow: function observeShow(value) {
        if (value) {
          this.show();
        } else {
          this.leave();
        }
      },
      updateClasses: function updateClasses(name) {
        this.set({
          classNames: getClassNames(name)
        });
      },
      show: function show() {
        var _this = this;

        var _this$data = this.data,
            classNames = _this$data.classNames,
            duration = _this$data.duration;
        this.set({
          inited: true,
          display: true,
          classes: classNames.enter,
          currentDuration: isObj(duration) ? duration.enter : duration
        }).then(function () {
          requestAnimationFrame(function () {
            _this.set({
              classes: classNames['enter-to']
            });
          });
        });
      },
      leave: function leave() {
        var _this2 = this;

        var _this$data2 = this.data,
            classNames = _this$data2.classNames,
            duration = _this$data2.duration;
        this.set({
          classes: classNames.leave,
          currentDuration: isObj(duration) ? duration.leave : duration
        }).then(function () {
          requestAnimationFrame(function () {
            _this2.set({
              classes: classNames['leave-to']
            });
          });
        });
      },
      onTransitionEnd: function onTransitionEnd() {
        if (!this.data.show) {
          this.set({
            display: false
          });
        }
      }
    }
  });
};