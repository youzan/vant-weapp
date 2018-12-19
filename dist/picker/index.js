import { VantComponent } from '../common/component';
VantComponent({
  classes: ['active-class', 'toolbar-class', 'column-class'],
  props: {
    title: String,
    loading: Boolean,
    showToolbar: Boolean,
    confirmButtonText: String,
    cancelButtonText: String,
    visibleItemCount: {
      type: Number,
      value: 5
    },
    valueKey: {
      type: String,
      value: 'text'
    },
    itemHeight: {
      type: Number,
      value: 44
    },
    columns: {
      type: Array,
      value: [],
      observer: function observer(columns) {
        var _this = this;

        if (columns === void 0) {
          columns = [];
        }

        this.set({
          simple: columns.length && !columns[0].values
        }, function () {
          var children = _this.children = _this.selectAllComponents('.van-picker__column');

          if (Array.isArray(children) && children.length) {
            _this.setColumns();
          }
        });
      }
    }
  },
  methods: {
    noop: function noop() {},
    setColumns: function setColumns() {
      var _this2 = this;

      var data = this.data;
      var columns = data.simple ? [{
        values: data.columns
      }] : data.columns;
      columns.forEach(function (columns, index) {
        _this2.setColumnValues(index, columns.values);
      });
    },
    emit: function emit(event) {
      var type = event.currentTarget.dataset.type;

      if (this.data.simple) {
        this.$emit(type, {
          value: this.getColumnValue(0),
          index: this.getColumnIndex(0)
        });
      } else {
        this.$emit(type, {
          value: this.getValues(),
          index: this.getIndexes()
        });
      }
    },
    onChange: function onChange(event) {
      if (this.data.simple) {
        this.$emit('change', {
          picker: this,
          value: this.getColumnValue(0),
          index: this.getColumnIndex(0)
        });
      } else {
        this.$emit('change', {
          picker: this,
          value: this.getValues(),
          index: event.currentTarget.dataset.index
        });
      }
    },
    // get column instance by index
    getColumn: function getColumn(index) {
      return this.children[index];
    },
    // get column value by index
    getColumnValue: function getColumnValue(index) {
      var column = this.getColumn(index);
      return column && column.getValue();
    },
    // set column value by index
    setColumnValue: function setColumnValue(index, value) {
      var column = this.getColumn(index);
      column && column.setValue(value);
    },
    // get column option index by column index
    getColumnIndex: function getColumnIndex(columnIndex) {
      return (this.getColumn(columnIndex) || {}).data.currentIndex;
    },
    // set column option index by column index
    setColumnIndex: function setColumnIndex(columnIndex, optionIndex) {
      var column = this.getColumn(columnIndex);
      column && column.setIndex(optionIndex);
    },
    // get options of column by index
    getColumnValues: function getColumnValues(index) {
      return (this.children[index] || {}).data.options;
    },
    // set options of column by index
    setColumnValues: function setColumnValues(index, options) {
      var column = this.children[index];

      if (column && JSON.stringify(column.data.options) !== JSON.stringify(options)) {
        column.set({
          options: options
        }, function () {
          column.setIndex(0);
        });
      }
    },
    // get values of all columns
    getValues: function getValues() {
      return this.children.map(function (child) {
        return child.getValue();
      });
    },
    // set values of all columns
    setValues: function setValues(values) {
      var _this3 = this;

      values.forEach(function (value, index) {
        _this3.setColumnValue(index, value);
      });
    },
    // get indexes of all columns
    getIndexes: function getIndexes() {
      return this.children.map(function (child) {
        return child.data.currentIndex;
      });
    },
    // set indexes of all columns
    setIndexes: function setIndexes(indexes) {
      var _this4 = this;

      indexes.forEach(function (optionIndex, columnIndex) {
        _this4.setColumnIndex(columnIndex, optionIndex);
      });
    }
  }
});