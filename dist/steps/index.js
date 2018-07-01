'use strict';

Component({
  externalClasses: ['steps-class', 'icon-class', 'title-class', 'desc-class'],
  properties: {
    type: {
      type: String,
      value: 'horizon'
    },

    hasDesc: {
      type: Boolean,
      value: false
    },

    steps: { // 必须
      type: Array,
      value: []
    },

    className: String
  }
});