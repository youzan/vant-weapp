import { create } from '../utils/create';

create({
  props: {
    show: Boolean,
    mask: Boolean,
    customStyle: String,
    zIndex: {
      type: Number,
      value: 1
    }
  },

  methods: {
    onClick() {
      this.triggerEvent('click');
    }
  }
});
