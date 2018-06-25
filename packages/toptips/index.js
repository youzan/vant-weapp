const FONT_COLOR = '#fff';
const BG_COLOR = '#e64340';

Component({
  properties: {
    content: String,
    color: {
      type: String,
      value: FONT_COLOR
    },
    backgroundColor: {
      type: String,
      value: BG_COLOR
    },
    isShow: {
      type: Boolean,
      value: false
    },
    duration: {
      type: Number,
      value: 3000
    }
  },

  methods: {
    show() {
      const { duration } = this.data;

      this._timer && clearTimeout(this._timer);
      this.setData({
        isShow: true
      });

      if (duration > 0 && duration !== Infinity) {
        this._timer = setTimeout(() => {
          this.hide();
        }, duration);
      }
    },

    hide() {
      this._timer = clearTimeout(this._timer);

      this.setData({
        isShow: false,
        backgroundColor: BG_COLOR
      });
    }
  }
});
