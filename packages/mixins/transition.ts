export const transition = function(showDefaultValue) {
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

    attached() {
      if (this.data.show) {
        this.show();
      }

      this.detectSupport();
    },

    methods: {
      detectSupport() {
        wx.getSystemInfo({
          success: info => {
            if (info && info.system && info.system.indexOf('iOS 8') === 0) {
              this.set({ supportAnimation: false });
            }
          }
        });
      },

      observeShow(value) {
        if (value) {
          this.show();
        } else {
          if (this.data.supportAnimation) {
            this.set({ type: 'leave' });
          } else {
            this.set({ display: false });
          }
        }
      },

      show() {
        this.set({
          inited: true,
          display: true,
          type: 'enter'
        });
      },

      onAnimationEnd() {
        if (!this.data.show) {
          this.set({
            display: false
          });
        }
      }
    }
  });
};
