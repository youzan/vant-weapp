import { create } from '../common/create';

create({
  relations: {
    '../col/index': {
      type: 'descendant'
    }
  },

  props: {
    gutter: {
      type: Number,
      observer: 'setGutter'
    }
  },

  ready() {
    this.setGutter();
  },

  methods: {
    setGutter() {
      const { gutter } = this.data;
      const margin = `-${Number(gutter) / 2}px`;
      const style = gutter ? `margin-right: ${margin}; margin-left: ${margin};` : '';

      this.setData({ style });
      this.getRelationNodes('../col/index').forEach((col) => {
        col.setGutter(this.data.gutter);
      });
    }
  }
});
