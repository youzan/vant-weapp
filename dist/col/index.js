'use strict';

Component({
  externalClasses: ['col-class'],

  relations: {
    '../row/index': {
      type: 'parent'
    }
  },

  properties: {
    col: {
      value: 0,
      type: Number
    },
    offset: {
      value: 0,
      type: Number
    }
  }
});