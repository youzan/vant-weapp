import { VantComponent } from '../common/component';
import { pickerProps } from '../picker/shared';
import { requestAnimationFrame } from '../common/utils';

type AreaItem = {
  name: string;
  code: string;
};

const EMPTY_CODE = '000000';

VantComponent({
  classes: ['active-class', 'toolbar-class', 'column-class'],

  props: {
    ...pickerProps,
    showToolbar: {
      type: Boolean,
      value: true,
    },
    value: {
      type: String,
      observer(value: string) {
        this.code = value;
        this.setValues();
      },
    },
    areaList: {
      type: Object,
      value: {},
      observer: 'setValues',
    },
    columnsNum: {
      type: null,
      value: 3,
    },
    columnsPlaceholder: {
      type: Array,
      observer(val) {
        this.setData({
          typeToColumnsPlaceholder: {
            province: val[0] || '',
            city: val[1] || '',
            county: val[2] || '',
          },
        });
      },
    },
  },

  data: {
    columns: [{ values: [] }, { values: [] }, { values: [] }],
    typeToColumnsPlaceholder: {},
  },

  mounted() {
    requestAnimationFrame(() => {
      this.setValues();
    });
  },

  methods: {
    getPicker() {
      if (this.picker == null) {
        this.picker = this.selectComponent('.van-area__picker');
      }
      return this.picker;
    },

    onCancel(event: WechatMiniprogram.CustomEvent) {
      this.emit('cancel', event.detail);
    },

    onConfirm(event: WechatMiniprogram.CustomEvent) {
      const { index } = event.detail;
      let { value } = event.detail;
      value = this.parseValues(value);
      this.emit('confirm', { value, index });
    },

    emit(type: string, detail) {
      detail.values = detail.value;
      delete detail.value;
      this.$emit(type, detail);
    },

    parseValues(values: AreaItem[]) {
      const { columnsPlaceholder } = this.data;

      return values.map((value, index) => {
        if (
          value &&
          (!value.code || value.name === columnsPlaceholder[index])
        ) {
          return {
            ...value,
            code: '',
            name: '',
          };
        }

        return value;
      });
    },

    onChange(event: WechatMiniprogram.CustomEvent) {
      const { index, picker, value } = event.detail;
      this.code = value[index].code;
      this.setValues()?.then(() => {
        this.$emit('change', {
          picker,
          values: this.parseValues(picker.getValues()),
          index,
        });
      });
    },

    getConfig(type: string) {
      const { areaList } = this.data;
      return (areaList && areaList[`${type}_list`]) || {};
    },

    getList(type: string, code?: string): AreaItem[] {
      if (type !== 'province' && !code) {
        return [];
      }

      const { typeToColumnsPlaceholder } = this.data;
      const list: Record<string, string> = this.getConfig(type);
      let result = Object.keys(list).map((code) => ({
        code,
        name: list[code],
      }));

      if (code != null) {
        // oversea code
        if (code[0] === '9' && type === 'city') {
          code = '9';
        }

        result = result.filter(
          (item) => item.code.indexOf(code as string) === 0
        );
      }

      if (typeToColumnsPlaceholder[type] && result.length) {
        // set columns placeholder
        const codeFill =
          type === 'province'
            ? ''
            : type === 'city'
            ? EMPTY_CODE.slice(2, 4)
            : EMPTY_CODE.slice(4, 6);

        result.unshift({
          code: `${code}${codeFill}`,
          name: typeToColumnsPlaceholder[type],
        });
      }

      return result;
    },

    getIndex(type: string, code: string) {
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
      const picker = this.getPicker();

      if (!picker) {
        return;
      }

      let code = this.code || this.getDefaultCode();
      const provinceList = this.getList('province');
      const cityList = this.getList('city', code.slice(0, 2));

      const stack: Promise<void>[] = [];
      const indexes: number[] = [];
      const { columnsNum } = this.data;

      if (columnsNum >= 1) {
        stack.push(picker.setColumnValues(0, provinceList, false));
        indexes.push(this.getIndex('province', code));
      }

      if (columnsNum >= 2) {
        stack.push(picker.setColumnValues(1, cityList, false));
        indexes.push(this.getIndex('city', code));
        if (cityList.length && code.slice(2, 4) === '00') {
          [{ code }] = cityList;
        }
      }

      if (columnsNum === 3) {
        stack.push(
          picker.setColumnValues(
            2,
            this.getList('county', code.slice(0, 4)),
            false
          )
        );
        indexes.push(this.getIndex('county', code));
      }

      return Promise.all(stack)
        .catch(() => {})
        .then(() => picker.setIndexes(indexes))
        .catch(() => {});
    },

    getDefaultCode() {
      const { columnsPlaceholder } = this.data;

      if (columnsPlaceholder.length) {
        return EMPTY_CODE;
      }

      const countyCodes = Object.keys(this.getConfig('county'));
      if (countyCodes[0]) {
        return countyCodes[0];
      }

      const cityCodes = Object.keys(this.getConfig('city'));
      if (cityCodes[0]) {
        return cityCodes[0];
      }

      return '';
    },

    getValues() {
      const picker = this.getPicker();

      if (!picker) {
        return [];
      }

      return this.parseValues(picker.getValues().filter((value) => !!value));
    },

    getDetail() {
      const values = this.getValues();
      const area = {
        code: '',
        country: '',
        province: '',
        city: '',
        county: '',
      };

      if (!values.length) {
        return area;
      }

      const names = values.map((item: AreaItem) => item.name);
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

    reset(code) {
      this.code = code || '';
      return this.setValues();
    },
  },
});
