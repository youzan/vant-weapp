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
      observer(columns = []) {
        this.set({
          simple: columns.length && !columns[0].values
        }, () => {
          const children = this.children = this.selectAllComponents('.van-picker__column');

          if (Array.isArray(children) && children.length) {
            this.setColumns();
          }
        });
      }
    }
  },

  methods: {
    noop() {},

    setColumns() {
      const { data } = this;
      const columns = data.simple ? [{ values: data.columns }] : data.columns;
      columns.forEach((columns, index: number) => {
        this.setColumnValues(index, columns.values);
      });
    },

    emit(event: Weapp.Event) {
      const { type } = event.currentTarget.dataset;
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

    onChange(event: Weapp.Event) {
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
    getColumn(index: number) {
      return this.children[index];
    },

    // get column value by index
    getColumnValue(index: number) {
      const column = this.getColumn(index);
      return column && column.getValue();
    },

    // set column value by index
    setColumnValue(index: number, value: any) {
      const column = this.getColumn(index);
      column && column.setValue(value);
    },

    // get column option index by column index
    getColumnIndex(columnIndex: number) {
      return (this.getColumn(columnIndex) || {}).data.currentIndex;
    },

    // set column option index by column index
    setColumnIndex(columnIndex: number, optionIndex: number) {
      const column = this.getColumn(columnIndex);
      column && column.setIndex(optionIndex);
    },

    // get options of column by index
    getColumnValues(index: number) {
      return (this.children[index] || {}).data.options;
    },

    // set options of column by index
    setColumnValues(index: number, options: any[]) {
      const column = this.children[index];

      if (
        column &&
        JSON.stringify(column.data.options) !== JSON.stringify(options)
      ) {
        column.set({ options }, () => {
          column.setIndex(0);
        });
      }
    },

    // get values of all columns
    getValues() {
      return this.children.map((child: Weapp.Component) => child.getValue());
    },

    // set values of all columns
    setValues(values: []) {
      values.forEach((value, index) => {
        this.setColumnValue(index, value);
      });
    },

    // get indexes of all columns
    getIndexes() {
      return this.children.map((child: Weapp.Component) => child.data.currentIndex);
    },

    // set indexes of all columns
    setIndexes(indexes: number[]) {
      indexes.forEach((optionIndex, columnIndex) => {
        this.setColumnIndex(columnIndex, optionIndex);
      });
    }
  }
});
