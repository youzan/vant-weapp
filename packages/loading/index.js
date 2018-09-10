import { create } from '../common/create';

create({
  props: {
    size: {
      type: String,
      value: '30px'
    },
    type: {
      type: String,
      value: 'circular'
    },
    color: {
      type: String,
      value: '#c9c9c9'
    },
    text: String
  },

  computed: {
    customColor() {
      return `color: ${this.data.color}`;
    }
  },

  ready() {
    console.log(this.data.customColor);
    setTimeout(() => {
      this.setData({
        color: 'red'
      });
      console.log(this.data.customColor);
    }, 1000);
  }
});
