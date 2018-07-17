'use strict';

var _relations;

var CELL_PATH = '../cell/index';
var FIELD_PATH = '../field/index';

Component({
  properties: {
    titleWidth: {
      type: Number,
      value: null
    }
  },
  relations: (_relations = {}, _relations[CELL_PATH] = {
    type: 'child',
    linked: function linked() {
      this._updateIsLastElement(CELL_PATH);
    },
    linkChanged: function linkChanged() {
      this._updateIsLastElement(CELL_PATH);
    },
    unlinked: function unlinked() {
      this._updateIsLastElement(CELL_PATH);
    }
  }, _relations[FIELD_PATH] = {
    type: 'child',
    linked: function linked() {
      this._updateIsLastElement(FIELD_PATH);
    },
    linkChanged: function linkChanged() {
      this._updateIsLastElement(FIELD_PATH);
    },
    unlinked: function unlinked() {
      this._updateIsLastElement(FIELD_PATH);
    }
  }, _relations),

  data: {
    elementUpdateTimeout: 0
  },

  methods: {
    _updateIsLastElement: function _updateIsLastElement(childPath) {
      var _this = this;

      // 用 setTimeout 减少计算次数
      if (this.data.elementUpdateTimeout > 0) {
        return;
      }

      var elementUpdateTimeout = setTimeout(function () {
        _this.setData({ elementUpdateTimeout: 0 });
        var elements = _this.getRelationNodes(childPath);
        var titleWidth = _this.properties.titleWidth;


        if (elements.length > 0) {
          var lastIndex = elements.length - 1;

          elements.forEach(function (cell, index) {
            titleWidth && cell.setTitleWidth(titleWidth);
            cell.updateIsLastElement(index === lastIndex);
          });
        }
      });

      this.setData({ elementUpdateTimeout: elementUpdateTimeout });
    }
  }
});