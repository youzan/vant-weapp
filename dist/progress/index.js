import { create } from '../common/create';

create({
  props: {
    inactive: {
      type: Boolean,
      observer() {
        this.setPivotStyle();
        this.setPortionStyle();
      }
    },
    pivotColor: {
      type: String,
      observer: 'setPivotStyle'
    },
    percentage: {
      type: Number,
      observer() {
        this.setText();
        this.setPortionStyle();
      }
    },
    showPivot: {
      type: Boolean,
      value: true,
      observer: 'getWidth'
    },
    pivotText: {
      type: String,
      observer() {
        this.setText();
        this.getWidth();
      }
    },
    color: {
      type: String,
      value: '#38f',
      observer() {
        this.setPivotStyle();
        this.setPortionStyle();
      }
    },
    textColor: {
      type: String,
      value: '#fff',
      observer: 'setPivotStyle'
    }
  },

  data: {
    pivotWidth: 0,
    progressWidth: 0
  },

  ready() {
    this.setText();
    this.setPivotStyle();
    this.getWidth();
  },

  methods: {
    getCurrentColor() {
      return this.data.inactive ? '#cacaca' : this.data.color;
    },

    setText() {
      this.setData({
        text: this.data.pivotText || this.data.percentage + '%'
      });
    },

    setPortionStyle() {
      const width = (this.data.progressWidth - this.data.pivotWidth) * this.data.percentage / 100 + 'px';
      const background = this.getCurrentColor();
      this.setData({
        portionStyle: `width: ${width}; background: ${background}; `
      });
    },

    setPivotStyle() {
      const color = this.data.textColor;
      const background = this.data.pivotColor || this.getCurrentColor();
      this.setData({
        pivotStyle: `color: ${color}; background: ${background}`
      });
    },

    getWidth() {
      this.getRect('.van-progress').then(rect => {
        this.setData({
          progressWidth: rect.width
        });
        this.setPortionStyle();
      });

      this.getRect('.van-progress__pivot').then(rect => {
        this.setData({
          pivotWidth: rect.width || 0
        });
        this.setPortionStyle();
      });
    }
  }
});
