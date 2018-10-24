import { VantComponent } from '../common/component';

type AreaItem = {
  name: string;
  code: string;
};

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
    displayColumns() {
      const { columns = [], columnsNum } = this.data;
      return columns.slice(0, +columnsNum);
    }
  },

  watch: {
    value(value) {
      this.code = value;
      this.setValues();
    },

    areaList: 'setValues'
  },

  methods: {
    onCancel() {
      this.$emit('cancel', {
        values: this.getValues(),
        indexs: this.getIndexs(),
        detail: this.getDetail()
      });
    },

    onConfirm() {
      this.$emit('confirm', {
        values: this.getValues(),
        indexs: this.getIndexs(),
        detail: this.getDetail()
      });
    },

    onChange(event: Weapp.Event) {
      const { value } = event.detail;
      const { pickerValue, displayColumns } = this.data;
      const index = pickerValue.findIndex(
        (item, index) => item !== value[index]
      );
      const values = displayColumns[index];

      if (index < 0 || value[index] < 0 || !values[value[index]]) {
        return;
      }

      this.code = values[value[index]].code;
      this.setValues();
      this.$emit('change', {
        picker: this,
        values: this.getValues(),
        index
      });
    },

    getList(type: string, code?: string): AreaItem[] {
      let result = [];
      if (type !== 'province' && !code) {
        return result;
      }

      const list = this.data.areaList && this.data.areaList[`${type}_list`] || {};
      result = Object.keys(list).map(code => ({
        code,
        name: list[code]
      }));

      if (code) {
        // oversea code
        if (code[0] === '9' && type === 'city') {
          code = '9';
        }

        result = result.filter(item => item.code.indexOf(code) === 0);
      }

      return result;
    },

    getIndex(type: string, code: string): number {
      let compareNum = type === 'province' ? 2 : type === 'city' ? 4 : 6;
      const list = this.getList(type, code.slice(0, compareNum - 2));

      // oversea code
      if (code[0] === '9' && type === 'province') {
        compareNum = 1;
      }

      code = code.slice(0, compareNum);
      for (let i = 0; i < list.length; i++) {
        if (list[i].code.slice(0, compareNum) === code) {
          return i;
        }
      }

      return 0;
    },

    setValues() {
      let code =
        this.code ||
        (this.data.areaList &&
          Object.keys(this.data.areaList.county_list || {})[0]) ||
        '';
      const province = this.getList('province');
      const city = this.getList('city', code.slice(0, 2));

      this.setData({
        'columns[0]': province,
        'columns[1]': city
      });

      if (city.length && code.slice(2, 4) === '00') {
        code = city[0].code;
      }

      this.setData({
        'columns[2]': this.getList('county', code.slice(0, 4)),
        pickerValue: [
          this.getIndex('province', code),
          this.getIndex('city', code),
          this.getIndex('county', code)
        ]
      });
    },

    getValues() {
      const { displayColumns = [], pickerValue = [] } = this.data;
      return displayColumns
        .map((option, index) => option[pickerValue[index]])
        .filter(value => !!value);
    },

    getIndexs() {
      const { pickerValue, columnsNum } = this.data;
      return pickerValue.slice(0, columnsNum);
    },

    getDetail() {
      const values = this.getValues();
      const area = {
        code: '',
        country: '',
        province: '',
        city: '',
        county: ''
      };

      if (!values.length) {
        return area;
      }

      const names = values.map(item => item.name);
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

    reset() {
      this.code = '';
      this.setValues();
    }
  }
});
