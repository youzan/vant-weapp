'use strict';

var _relations;

var COL_PATH = '../col/index';

Component({
  externalClasses: ['custom-class'],

  relations: (_relations = {}, _relations[COL_PATH] = {
    type: 'descendant'
  }, _relations),

  properties: {
    gutter: {
      type: Number,
      observer: function observer() {
        this.setGutter();
      }
    }
  },

  ready: function ready() {
    this.setGutter();
  },


  methods: {
    setGutter: function setGutter() {
      var _this = this;

      var gutter = this.data.gutter;

      var margin = '-' + Number(gutter) / 2 + 'px';
      var style = gutter ? 'margin-right: ' + margin + '; margin-left: ' + margin + ';' : '';

      this.setData({ style: style });
      this.getRelationNodes(COL_PATH).forEach(function (col) {
        col.setGutter(_this.data.gutter);
      });
    }
  }
});