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
      const duration = this.data.duration;

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
        isShow: false
      });
    }
  }
});

function Toptips(options = {}) {
  const pages = getCurrentPages();
  const ctx = pages[pages.length - 1];
  const defaultOptions = {
    selector: '#zan-toptips',
    duration: 3000
  };

  options = Object.assign(defaultOptions,parseParam(options));

  const $toptips = ctx.selectComponent(options.selector);
  delete options.selector;

  $toptips.setData({
    ...options
  });
  $toptips && $toptips.show();
}

function parseParam(params) {
  return typeof params === 'object' ? params : { content: params };
}

module.exports = Toptips;