const defaultData = require('./data');

const _f = function() {};

Component({
  properties: {},

  data: {
    ...defaultData,
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
