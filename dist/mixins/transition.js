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
        type: Number,
        value: 300
      }
    },
    data: {
      type: '',
      inited: false,
      display: false,
      supportAnimation: true
    },
    attached: function attached() {
      if (this.data.show) {
        this.show();
      }

      this.detectSupport();
    },
    methods: {
      detectSupport: function detectSupport() {
        var _this = this;

        wx.getSystemInfo({
          success: function success(info) {
            if (info && info.system && info.system.indexOf('iOS 8') === 0) {
              _this.set({
                supportAnimation: false
              });
            }
          }
        });
      },
      observeShow: function observeShow(value) {
        if (value) {
          this.show();
        } else {
          if (this.data.supportAnimation) {
            this.set({
              type: 'leave'
            });
          } else {
            this.set({
              display: false
            });
          }
        }
      },
      show: function show() {
        this.set({
          inited: true,
          display: true,
          type: 'enter'
        });
      },
      onAnimationEnd: function onAnimationEnd() {
        if (!this.data.show) {
          this.set({
            display: false
          });
        }
      }
    }
  });
};