import { create } from '../common/create';

create({
  relations: {
    '../row/index': {
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
      if (style !== this.data.style) {
        this.setData({ style });
      }
    }
  }
});
