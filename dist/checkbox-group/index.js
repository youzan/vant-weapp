'use strict';

var _relations;

var CHECKBOX_PATH = '../checkbox/index';

Component({
  relations: (_relations = {}, _relations[CHECKBOX_PATH] = {
    type: 'child',
    linked: function linked() {
      this.updateChildren(CHECKBOX_PATH);
    }
  }, _relations),

  data: {
    elementUpdateTimeout: 0
  },

  methods: {
    updateChildren: function updateChildren(childPath) {
      // 把checkbox标记为在group中，设置不同样式
      var elements = this.getRelationNodes(childPath);

      elements.forEach(function (checkbox, index) {
        checkbox.updateData({ isInGroup: true });
      });
    }
  }
});