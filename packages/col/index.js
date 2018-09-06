import { create } from '../utils/create';

create({
  externalClasses: ['custom-class'],

  relations: {
    '../badge-group/index': {
      type: 'ancestor'
    }
  },

  props: {
    span: Number,
    offset: Number
  },

  methods: {
    setGutter(gutter) {
      const padding = `${gutter / 2}px`;
      const style = gutter ? `padding-left: ${padding}; padding-right: ${padding};` : '';
      this.setData({ style });
    }
  }
});
