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
      display: false
    },

    attached() {
      if (this.data.show) {
        this.show();
      }
    },

    methods: {
      observeShow(value) {
        if (value) {
          this.show();
        } else {
          this.setData({
            type: 'leave'
          });
        }
      },

      show() {
        this.setData({
          inited: true,
          display: true,
          type: 'enter'
        });
      },

      onAnimationEnd() {
        if (!this.data.show) {
          this.setData({
            display: false
          });
        }
      }
    }
  });
};
