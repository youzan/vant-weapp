const _f = function () {};
const needResponseOpenTypes = ['getUserInfo', 'getPhoneNumber', 'openSetting'];

Component({
  properties: {},

  data: {
    // 标题
    title: '',
    // 自定义 btn 列表
    // { type: 按钮类型，回调时以此作为区分依据，text: 按钮文案, color: 按钮文字颜色, openType: 微信开放能力 }
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
    autoClose: true,
    show: false,
    showCustomBtns: false,
    promiseFunc: {},
    openTypePromiseFunc: {}
  },

  methods: {
    handleButtonClick(e) {
      const { currentTarget = {} } = e;
      const { dataset = {} } = currentTarget;

      // 获取当次弹出框的信息
      const { resolve = _f, reject = _f } = this.data.promiseFunc || {};

      // 重置展示
      if (this.data.autoClose) {
        this.setData({ show: false });
      }

      // 自定义按钮，全部 resolve 形式返回，根据 type 区分点击按钮
      if (this.data.showCustomBtns) {
        const isNeedOpenDataButton = needResponseOpenTypes.indexOf(dataset.openType) > -1;
        const resolveData = { type: dataset.type };
        // 如果需要 openData，就额外返回一个 promise，用于后续 open 数据返回
        if (isNeedOpenDataButton) {
          resolveData.openDataPromise = new Promise((resolve, reject) => {
            this.setData({ openTypePromiseFunc: { resolve, reject } });
          });
          resolveData.hasOpenDataPromise = true;
        }
        resolve(resolveData);
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

      this.setData({ promiseFunc: {} });
    },

    // 以下为处理微信按钮开放能力的逻辑
    handleUserInfoResponse({ detail }) {
      this.__handleOpenDataResponse({
        type: detail.errMsg === 'getUserInfo:ok' ? 'resolve' : 'reject',
        data: detail
      });
    },

    handlePhoneResponse({ detail }) {
      this.__handleOpenDataResponse({
        type: detail.errMsg === 'getPhoneNumber:ok' ? 'resolve' : 'reject',
        data: detail
      });
    },

    handleOpenSettingResponse({ detail }) {
      this.__handleOpenDataResponse({
        type: detail.errMsg === 'openSetting:ok' ? 'resolve' : 'reject',
        data: detail
      });
    },

    __handleOpenDataResponse({ type = 'resolve', data = {} }) {
      const promiseFuncs = this.data.openTypePromiseFunc || {};
      const responseFunc = promiseFuncs[type] || _f;

      responseFunc(data);
      this.setData({ openTypePromiseFunc: null });
    }
  }
});
