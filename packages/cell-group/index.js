let cellUpdateTimeout = 0;

Component({
  relations: {
    '../cell/index': {
      type: 'child',
      linked() {
        this._updateIsLastCell();
      },
      linkChanged() {
        this._updateIsLastCell();
      },
      unlinked() {
        this._updateIsLastCell();
      }
    }
  },

  methods: {
    _updateIsLastCell() {
      // 用 setTimeout 减少计算次数
      if (cellUpdateTimeout > 0) {
        return;
      }

      cellUpdateTimeout = setTimeout(() => {
        cellUpdateTimeout = 0;
        let cells = this.getRelationNodes('../cell/index');

        if (cells.length > 0) {
          let lastIndex = cells.length - 1;

          cells.forEach((cell, index) => {
            cell.updateIsLastCell(index === lastIndex);
          });
        }
      });
    }
  }
});
