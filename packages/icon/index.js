import { create } from '../utils/create';

create({
  externalClasses: ['custom-class'],

  props: {
    info: null,
    name: String,
    size: String,
    color: String,
    classPrefix: {
      type: String,
      value: 'van-icon'
    }
  },

  methods: {
    onClick() {
      this.triggerEvent('click');
    }
  }
});
