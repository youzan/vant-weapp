Component({
  options: {
    addGlobalClass: true
  },

  externalClasses: ['custom-class'],

  properties: {
    customStyle: String,
    show: {
      value: true,
      type: Boolean,
      observer(value) {
        if (value) {
          this.show();
        } else {
          this.setData({
            type: 'leave'
          });
        }
      }
    },
    name: {
      type: String,
      value: 'fade'
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
