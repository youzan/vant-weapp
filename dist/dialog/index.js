'use strict';

var defaultData = require('./data');

var _f = function _f() {};

Component({
  properties: {},

  data: Object.assign({}, defaultData, {
    key: '',
    show: false,
    showCustomBtns: false,
    promiseFunc: {}
  }),

  methods: {
    handleButtonClick: function handleButtonClick(e) {
      var _e$currentTarget = e.currentTarget,
          currentTarget = _e$currentTarget === undefined ? {} : _e$currentTarget;
      var _currentTarget$datase = currentTarget.dataset,
          dataset = _currentTarget$datase === undefined ? {} : _currentTarget$datase;

      // 获取当次弹出框的信息

      var _ref = this.data.promiseFunc || {},
          _ref$resolve = _ref.resolve,
          resolve = _ref$resolve === undefined ? _f : _ref$resolve,
          _ref$reject = _ref.reject,
          reject = _ref$reject === undefined ? _f : _ref$reject;

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