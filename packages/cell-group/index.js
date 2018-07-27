const CELL_PATH = '../cell/index';
const FIELD_PATH = '../field/index';

Component({
  properties: {
    titleWidth: {
      type: Number,
      value: null
    },
    border: {
      type: Boolean,
      value: false
    }
  },
  relations: {
    [CELL_PATH]: {
      type: 'child',
      linked() {
        this._updateIsLastElement(CELL_PATH);
      },
      linkChanged() {
        this._updateIsLastElement(CELL_PATH);
      },
      unlinked() {
        this._updateIsLastElement(CELL_PATH);
      }
    },
    [FIELD_PATH]: {
      type: 'child',
      linked() {
        this._updateIsLastElement(FIELD_PATH);
      },
      linkChanged() {
        this._updateIsLastElement(FIELD_PATH);
      },
      unlinked() {
        this._updateIsLastElement(FIELD_PATH);
      }
    }
  },

  data: {
    elementUpdateTimeout: 0
  },

  methods: {
    _updateIsLastElement(childPath) {
      // 用 setTimeout 减少计算次数
      if (this.data.elementUpdateTimeout > 0) {
        return;
      }

      const elementUpdateTimeout = setTimeout(() => {
        this.setData({ elementUpdateTimeout: 0 });
        let elements = this.getRelationNodes(childPath);
        const { titleWidth } = this.properties;

        if (elements.length > 0) {
          let lastIndex = elements.length - 1;

          elements.forEach((cell, index) => {
            titleWidth && cell.setTitleWidth(titleWidth)
            cell.updateIsLastElement(index === lastIndex);
          });
        }
      });

      this.setData({ elementUpdateTimeout });
    }
  }
});
