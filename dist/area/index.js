import { VantComponent } from '../common/component';
VantComponent({
  props: {
    title: String,
    value: String,
    loading: Boolean,
    itemHeight: {
      type: Number,
      value: 44
    },
    visibleItemCount: {
      type: Number,
      value: 5
    },
    columnsNum: {
      type: [String, Number],
      value: 3
    },
    areaList: {
      type: Object,
      value: {}
    }
  },
  data: {
    pickerValue: [0, 0, 0],
    columns: []
  },
  computed: {
    displayColumns: function displayColumns() {
      var _this$data = this.data,
          _this$data$columns = _this$data.columns,
          columns = _this$data$columns === void 0 ? [] : _this$data$columns,
          columnsNum = _this$data.columnsNum;
      return columns.slice(0, +columnsNum);
    }
  },
  watch: {
    value: function value(_value) {
      this.code = _value;
      this.setValues();
    },
    areaList: 'setValues'
  },
  methods: {
    onCancel: function onCancel() {
      this.$emit('cancel', {
        values: this.getValues(),
        indexs: this.getIndexs()
      });
    },
    onConfirm: function onConfirm() {
      this.$emit('confirm', {
        values: this.getValues(),
        indexs: this.getIndexs()
      });
    },
    onChange: function onChange(event) {
      var value = event.detail.value;
      var _this$data2 = this.data,
          pickerValue = _this$data2.pickerValue,
          displayColumns = _this$data2.displayColumns;
      var index = pickerValue.findIndex(function (item, index) {
        return item !== value[index];
      });
      var values = displayColumns[index];

      if (!value[index] || !values[value[index]]) {
        return;
      }

      this.code = values[value[index]].code;
      this.setValues();
      this.$emit('change', {
        picker: this,
        values: this.getValues(),
        index: index
      });
    },
    getList: function getList(type, code) {
      var result = [];

      if (type !== 'province' && !code) {
        return result;
      }

      var list = this.data.areaList && this.data.areaList[type + "_list"] || {};
      result = Object.keys(list).map(function (code) {
        return {
          code: code,
          name: list[code]
        };
      });

      if (code) {
        result = result.filter(function (item) {
          return item.code.indexOf(code) === 0;
        });
      }

      return result;
    },
    getIndex: function getIndex(type, code) {
      var compareNum = type === 'province' ? 2 : type === 'city' ? 4 : 6;
      var list = this.getList(type, code.slice(0, compareNum - 2));
      code = code.slice(0, compareNum);

      for (var i = 0; i < list.length; i++) {
        if (list[i].code.slice(0, compareNum) === code) {
          return i;
        }
      }

      return 0;
    },
    setValues: function setValues() {
      var code = this.code || this.data.areaList && Object.keys(this.data.areaList.county_list || {})[0] || '';
      var province = this.getList('province');
      var city = this.getList('city', code.slice(0, 2));
      this.setData({
        'columns[0]': province,
        'columns[1]': city
      });

      if (city.length && code.slice(2, 4) === '00') {
        code = city[0].code;
      }

      this.setData({
        'columns[2]': this.getList('county', code.slice(0, 4)),
        pickerValue: [this.getIndex('province', code), this.getIndex('city', code), this.getIndex('county', code)]
      });
    },
    getValues: function getValues() {
      var _this$data3 = this.data,
          _this$data3$displayCo = _this$data3.displayColumns,
          displayColumns = _this$data3$displayCo === void 0 ? [] : _this$data3$displayCo,
          _this$data3$pickerVal = _this$data3.pickerValue,
          pickerValue = _this$data3$pickerVal === void 0 ? [] : _this$data3$pickerVal;
      return displayColumns.map(function (option, index) {
        return option[pickerValue[index]];
      });
    },
    getIndexs: function getIndexs() {
      var _this$data4 = this.data,
          pickerValue = _this$data4.pickerValue,
          columnsNum = _this$data4.columnsNum;
      return pickerValue.slice(0, columnsNum);
    },
    reset: function reset() {
      this.code = '';
      this.setValues();
    }
  }
});