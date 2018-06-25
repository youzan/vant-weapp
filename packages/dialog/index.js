const _f = function () {};

Component({
  properties: {},

  data: {
    // 标题
    title: '',
    // 自定义 btn 列表
    // { type: 按钮类型，回调时以此作为区分依据，text: 按钮文案, color: 按钮文字颜色 }
    buttons: [],
    // 内容
    message: ' ',
    // 选择节点
    selector: '#zan-dialog',
    // 按钮是否展示为纵向
    buttonsShowVertical: false,
    // 是否展示确定
    showConfirmButton: true,
    // 确认按钮文案
    confirmButtonText: '确定',
    // 确认按钮颜色
    confirmButtonColor: '#3CC51F',
    // 是否展示取消
    showCancelButton: false,
    // 取消按钮文案
    cancelButtonText: '取消',
    // 取消按钮颜色
    cancelButtonColor: '#333',
    key: '',
    show: false,
    showCustomBtns: false,
    promiseFunc: {}
  },

  methods: {
    handleButtonClick(e) {
      const { currentTarget = {} } = e;
      const { dataset = {} } = currentTarget;

      // 获取当次弹出框的信息
      const { resolve = _f, reject = _f } = this.data.promiseFunc || {};

      // 重置展示
      this.setData({
        show: false
      });

      // 自定义按钮，全部 resolve 形式返回，根据 type 区分点击按钮
      if (this.data.showCustomBtns) {
        resolve({
          type: dataset.type
        });
        return;
      }

      // 默认按钮，确认为 resolve，取消为 reject
      if (dataset.type === 'confirm') {
        resolve({
          type: 'confirm'
        });
      } else {
        reject({
          type: 'cancel'
        });
      }
    }
  }
});
