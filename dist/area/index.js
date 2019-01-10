import { VantComponent } from '../common/component';
VantComponent({
  classes: ['active-class', 'toolbar-class', 'column-class'],
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
    columns: [{
      values: []
    }, {
      values: []
    }, {
      values: []
    }],
    displayColumns: [{
      values: []
    }, {
      values: []
    }, {
      values: []
    }]
  },
  watch: {
    value: function value(_value) {
      this.code = _value;
      this.setValues();
    },
    areaList: 'setValues',
    columnsNum: function columnsNum(value) {
      this.set({
        displayColumns: this.data.columns.slice(0, +value)
      });
    }
  },
  methods: {
    getPicker: function getPicker() {
      if (this.picker == null) {
        this.picker = this.selectComponent('.van-area__picker');
      }

      return this.picker;
    },
    onCancel: function onCancel(event) {
      this.emit('cancel', event.detail);
    },
    onConfirm: function onConfirm(event) {
      this.emit('confirm', event.detail);
    },
    emit: function emit(type, detail) {
      detail.values = detail.value;
      delete detail.value;
      this.$emit(type, detail);
    },
    onChange: function onChange(event) {
      var _event$detail = event.detail,
          index = _event$detail.index,
          picker = _event$detail.picker,
          value = _event$detail.value;
      this.code = value[index].code;
      this.setValues();
      this.$emit('change', {
        picker: picker,
        values: picker.getValues(),
        index: index
      });
    },
    getConfig: function getConfig(type) {
      var areaList = this.data.areaList;
      return areaList && areaList[type + "_list"] || {};
    },
    getList: function getList(type, code) {
      var result = [];

      if (type !== 'province' && !code) {
        return result;
      }

      var list = this.getConfig(type);
      result = Object.keys(list).map(function (code) {
        return {
          code: code,
          name: list[code]
        };
      });

      if (code) {
        // oversea code
        if (code[0] === '9' && type === 'city') {
          code = '9';
        }

        result = result.filter(function (item) {
          return item.code.indexOf(code) === 0;
        });
      }

      return result;
    },
    getIndex: function getIndex(type, code) {
      var compareNum = type === 'province' ? 2 : type === 'city' ? 4 : 6;
      var list = this.getList(type, code.slice(0, compareNum - 2)); // oversea code

      if (code[0] === '9' && type === 'province') {
        compareNum = 1;
      }

      code = code.slice(0, compareNum);

      for (var i = 0; i < list.length; i++) {
        if (list[i].code.slice(0, compareNum) === code) {
          return i;
        }
      }

      return 0;
    },
    setValues: function setValues() {
      var _this = this;

      var county = this.getConfig('county');
      var code = this.code || Object.keys(county)[0] || '';
      var province = this.getList('province');
      var city = this.getList('city', code.slice(0, 2));
      var picker = this.getPicker();

      if (!picker) {
        return;
      }

      var stack = [];
      stack.push(picker.setColumnValues(0, province));
      stack.push(picker.setColumnValues(1, city));

      if (city.length && code.slice(2, 4) === '00') {
        ;
        code = city[0].code;
      }

      stack.push(picker.setColumnValues(2, this.getList('county', code.slice(0, 4))));
      return Promise.all(stack).then(function () {
        return picker.setIndexes([_this.getIndex('province', code), _this.getIndex('city', code), _this.getIndex('county', code)]);
      }).catch(function () {});
    },
    getValues: function getValues() {
      var picker = this.getPicker();
      return picker ? picker.getValues().filter(function (value) {
        return !!value;
      }) : [];
    },
    getDetail: function getDetail() {
      var values = this.getValues();
      var area = {
        code: '',
        country: '',
        province: '',
        city: '',
        county: ''
      };

      if (!values.length) {
        return area;
      }

      var names = values.map(function (item) {
        return item.name;
      });
      area.code = values[values.length - 1].code;

      if (area.code[0] === '9') {
        area.country = names[1] || '';
        area.province = names[2] || '';
      } else {
        area.province = names[0] || '';
        area.city = names[1] || '';
        area.county = names[2] || '';
      }

      return area;
    },
    reset: function reset() {
      this.code = '';
      return this.setValues();
    }
  }
});