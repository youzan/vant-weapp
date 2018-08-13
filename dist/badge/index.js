'use strict';

var _relations;

var BADGE_GROUP_PATH = '../badge-group/index';

Component({
  externalClasses: ['custom-class'],

  relations: (_relations = {}, _relations[BADGE_GROUP_PATH] = {
    type: 'ancestor'
  }, _relations),

  properties: {
    info: Number,
    title: String
  },

  methods: {
    onClick: function onClick() {
      var group = this.getRelationNodes(BADGE_GROUP_PATH)[0];
      if (group) {
        group.setActive(this);
      }
    },
    setActive: function setActive(active) {
      this.setData({ active: active });
    }
  }
});