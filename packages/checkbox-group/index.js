const CHECKBOX_PATH = '../checkbox/index';

Component({
  relations: {
    [CHECKBOX_PATH]: {
      type: 'child',
      linked() {
        this.updateChildren(CHECKBOX_PATH);
      }
    }
  },

  data: {
   elementUpdateTimeout: 0
  },

  methods: {
    updateChildren(childPath) { // 把checkbox标记为在group中，设置不同样式
      let elements = this.getRelationNodes(childPath);

      elements.forEach((checkbox, index) => {
        checkbox.updateData({ isInGroup: true});
      });
    }
  }
});
