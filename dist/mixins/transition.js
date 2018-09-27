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
      display: false
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
          this.setData({
            type: 'leave'
          });
        }
      },
      show: function show() {
        this.setData({
          inited: true,
          display: true,
          type: 'enter'
        });
      },
      onAnimationEnd: function onAnimationEnd() {
        if (!this.data.show) {
          this.setData({
            display: false
          });
        }
      }
    }
  });
};