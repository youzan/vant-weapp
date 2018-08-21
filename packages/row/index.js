const COL_PATH = '../col/index';

Component({
  options: {
    addGlobalClass: true
  },

  externalClasses: ['custom-class'],

  relations: {
    [COL_PATH]: {
      type: 'descendant'
    }
  },

  properties: {
    gutter: {
      type: Number,
      observer() {
        this.setGutter();
      }
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
      this.getRelationNodes(COL_PATH).forEach((col) => {
        col.setGutter(this.data.gutter);
      });
    }
  }
});
