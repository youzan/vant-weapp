import { VantComponent } from '../common/component';

VantComponent({
  props: {
    inactive: Boolean,
    percentage: Number,
    pivotText: String,
    pivotColor: String,
    showPivot: {
      type: Boolean,
      value: true
    },
    color: {
      type: String,
      value: '#38f'
    },
    textColor: {
      type: String,
      value: '#fff'
    }
  },

  data: {
    pivotWidth: 0,
    progressWidth: 0
  },

  watch: {
    pivotText: 'getWidth',
    showPivot: 'getWidth'
  },

  computed: {
    portionStyle() {
      const width = (this.data.progressWidth - this.data.pivotWidth) * this.data.percentage / 100 + 'px';
      const background = this.getCurrentColor();
      return `width: ${width}; background: ${background}; `;
    },

    pivotStyle() {
      const color = this.data.textColor;
      const background = this.data.pivotColor || this.getCurrentColor();
      return `color: ${color}; background: ${background}`
    },

    text() {
      return this.data.pivotText || this.data.percentage + '%';
    }
  },

  mounted() {
    this.getWidth();
  },

  methods: {
    getCurrentColor() {
      return this.data.inactive ? '#cacaca' : this.data.color;
    },

    getWidth() {
      this.getRect('.van-progress').then(rect => {
        this.setData({
          progressWidth: rect.width
        });
      });

      this.getRect('.van-progress__pivot').then(rect => {
        this.setData({
          pivotWidth: rect.width || 0
        });
      });
    }
  }
});
