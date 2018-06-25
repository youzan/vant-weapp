Component({
  externalClasses: ['search-class', 'input-class', 'cancel-class'],
  properties: {
    show: {
      type: Array,
      value: ['icon', 'cancel']
    },
    cancelText: {
      type: String,
      value: '取消'
    },
    keyword: {
      type: String,
      value: ''
    },
    pickerWidth: {
      type: Number,
      value: 55
    },
    placeholder: {
      type: String,
      value: '请输入查询关键字',
      observer(newVal) {
        this.setData({
          inputWidth: `${(newVal.length * 14) + 45}px`
        });
      }
    },
    range: {
      type: Array,
      value: []
    },
    rangeIndex: {
      type: Number,
      value: 0
    },
    useCancel: {
      type: Boolean
    },
    onlySearch: {
      type: Boolean,
      value: false
    },
    alignLeft: {
      type: Boolean,
      value: false
    },
    searchStyle: String,
    cancelStyle: String,
    inputStyle: String,
    focus: {
      type: Boolean,
      value: false
    },
    disabled: {
      type: Boolean,
      value: false
    }
  },
  data: {
    inputWidth: 'auto'
  },
  attached() {
    if (!this.data.useCancel && !this.data.range.length) {
      this.setData({ onlySearch: true });
    }
  },
  methods: {
    pickerChange(e) {
      let value = e.detail.value;
      this.triggerEvent('pickerchange', { value, text: this.data.range[value] });
    },
    search(e) {
      this.triggerEvent('search', { value: e.detail.value });
    },
    inputChange(e) {
      this._inputvalue = e.detail.value;
      this.triggerEvent('change', { value: e.detail.value });
    },
    cancelSearch() {
      this.triggerEvent('cancel');
    },
    focus() {
      if (this.data.onlySearch) {
        this.setData({ onlySearch: false });
      }
      this.triggerEvent('focus');
    },
    blur() {
      if (!this.data.useCancel && !this.data.range.length && !this._inputvalue) {
        this.setData({ onlySearch: true });
      }
      this.triggerEvent('blur');
    },
    clearInput() {
      this.setData({
        focus: true
      });
      this.triggerEvent('change', { value: '' });
    }
  }
});
