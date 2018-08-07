'use strict';

var _relations;

var ROW_PATH = '../row/index';

Component({
  externalClasses: ['custom-class'],

  relations: (_relations = {}, _relations[ROW_PATH] = {
    type: 'ancestor'
  }, _relations),

  properties: {
    span: Number,
    offset: Number
  },

  methods: {
    setGutter: function setGutter(gutter) {
      var padding = gutter / 2 + 'px';
      var style = gutter ? 'padding-left: ' + padding + '; padding-right: ' + padding + ';' : '';
      this.setData({ style: style });
    }
  }
});