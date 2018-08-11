const ROW_PATH = '../row/index';

Component({
  externalClasses: ['custom-class'],

  relations: {
    [ROW_PATH]: {
      type: 'ancestor'
    }
  },

  properties: {
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
