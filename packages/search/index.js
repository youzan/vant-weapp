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
    placeholder: {
      type: String,
      value: '请输入查询关键字',
      observer(newVal) {
        this.setData({
          inputWidth: `${(newVal.length * 14) + 45}px`
        });
      }
    },
    useCancel: {
      type: Boolean
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

  methods: {
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
      this.triggerEvent('focus');
    },
    blur() {
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
