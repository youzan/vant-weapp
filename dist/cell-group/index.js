'use strict';

Component({
  relations: {
    '../cell/index': {
      type: 'child',
      linked: function linked() {
        this._updateIsLastCell();
      },
      linkChanged: function linkChanged() {
        this._updateIsLastCell();
      },
      unlinked: function unlinked() {
        this._updateIsLastCell();
      }
    }
  },

  data: {
    cellUpdateTimeout: 0
  },

  methods: {
    _updateIsLastCell: function _updateIsLastCell() {
      var _this = this;

      // 用 setTimeout 减少计算次数
      if (this.data.cellUpdateTimeout > 0) {
        return;
      }

      var cellUpdateTimeout = setTimeout(function () {
        _this.setData({ cellUpdateTimeout: 0 });
        var cells = _this.getRelationNodes('../cell/index');

        if (cells.length > 0) {
          var lastIndex = cells.length - 1;

          cells.forEach(function (cell, index) {
            cell.updateIsLastCell(index === lastIndex);
          });
        }
      });

      this.setData({ cellUpdateTimeout: cellUpdateTimeout });
    }
  }
});