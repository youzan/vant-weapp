import { VantComponent } from '../../common/component';
import { isDef } from '../../common/utils';
import { isObj } from '../../common/validator';

function deepClone<T extends Record<string, any>>(obj: T): T {
  if (!isDef(obj)) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => deepClone(item)) as unknown as T;
  }

  if (isObj(obj)) {
    const to = {} as Record<string, any>;
    Object.keys(obj).forEach((key: string) => {
      // @ts-ignore
      to[key] = deepClone(obj[key]);
    });

    return to as T;
  }

  return obj;
}

const zhCNOptions = [
  {
    text: '浙江省',
    value: '330000',
    children: [
      {
        text: '杭州市',
        value: '330100',
        children: [
          {
            text: '上城区',
            value: '330102',
          },
          {
            text: '下城区',
            value: '330103',
          },
          {
            text: '江干区',
            value: '330104',
          },
        ],
      },
      {
        text: '宁波市',
        value: '330200',
        children: [
          {
            text: '海曙区',
            value: '330203',
          },
          {
            text: '江北区',
            value: '330205',
          },
          {
            text: '北仑区',
            value: '330206',
          },
        ],
      },
      {
        text: '温州市',
        value: '330300',
        children: [
          {
            text: '鹿城区',
            value: '330302',
          },
          {
            text: '龙湾区',
            value: '330303',
          },
          {
            text: '瓯海区',
            value: '330304',
          },
        ],
      },
    ],
  },
  {
    text: '江苏省',
    value: '320000',
    children: [
      {
        text: '南京市',
        value: '320100',
        children: [
          {
            text: '玄武区',
            value: '320102',
          },
          {
            text: '秦淮区',
            value: '320104',
          },
          {
            text: '建邺区',
            value: '320105',
          },
        ],
      },
      {
        text: '无锡市',
        value: '320200',
        children: [
          {
            text: '锡山区',
            value: '320205',
          },
          {
            text: '惠山区',
            value: '320206',
          },
          {
            text: '滨湖区',
            value: '320211',
          },
        ],
      },
      {
        text: '徐州市',
        value: '320300',
        children: [
          {
            text: '鼓楼区',
            value: '320302',
          },
          {
            text: '云龙区',
            value: '320303',
          },
          {
            text: '贾汪区',
            value: '320305',
          },
        ],
      },
    ],
  },
];

const asyncOptions1 = [
  {
    text: '浙江省',
    value: '330000',
    children: [],
  },
];
const asyncOptions2 = [
  { text: '杭州市', value: '330100' },
  { text: '宁波市', value: '330200' },
];

function getCustomFieldOptions(options) {
  const newOptions = deepClone(options);
  const adjustFieldName = (item) => {
    if ('text' in item) {
      item.name = item.text;
      delete item.text;
    }
    if ('value' in item) {
      item.code = item.value;
      delete item.value;
    }
    if ('children' in item) {
      item.items = item.children;
      delete item.children;
      item.items.forEach(adjustFieldName);
    }
  };
  newOptions.forEach(adjustFieldName);
  return newOptions;
}

VantComponent({
  data: {
    area: '地区',
    options: zhCNOptions,
    selectArea: '请选择地区',
    baseState: {
      show: false,
      value: '',
      result: '',
    },
    asyncState: {
      show: false,
      value: undefined,
      result: '',
      options: asyncOptions1,
    },
    fieldNames: {
      text: 'name',
      value: 'code',
      children: 'items',
    },
    customFieldOptions: getCustomFieldOptions(zhCNOptions),
    customFieldState: {
      show: false,
      value: '',
      result: '',
    },
  },

  methods: {
    onClick(e) {
      const { stateKey } = e.currentTarget.dataset;
      this.setData({
        [`${stateKey}.show`]: true,
      });
    },
    onClose(e) {
      const { stateKey } = e.currentTarget.dataset;
      this.setData({
        [`${stateKey}.show`]: false,
      });
    },
    onFinish(e) {
      const { stateKey } = e.currentTarget.dataset;
      const { selectedOptions, value } = e.detail;
      const result = selectedOptions
        .map((option) => option.text || option.name)
        .join('/');

      this.setData({
        [`${stateKey}.value`]: value,
        [`${stateKey}.result`]: result,
      });
      this.onClose(e);
    },
    loadDynamicOptions(e) {
      const { value } = e.detail;
      if (value === '330000') {
        setTimeout(() => {
          this.setData({
            'asyncState.options[0].children': asyncOptions2,
          });
        }, 500);
      }
    },
  },
});
