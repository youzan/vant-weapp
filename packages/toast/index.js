import { create } from '../common/create';

create({
  props: {
    show: Boolean,
    mask: Boolean,
    message: String,
    forbidClick: Boolean,
    type: {
      type: String,
      value: 'text'
    },
    loadingType: {
      type: String,
      value: 'circular'
    },
    position: {
      type: String,
      value: 'middle'
    }
  },

  methods: {
    clear() {
      this.setData({
        show: false
      });
    }
  }
});
