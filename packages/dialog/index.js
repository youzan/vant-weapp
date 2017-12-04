const _f = function () {};

module.exports = {
  showZanDialog(options = {}) {
    const {
      // 自定义 btn 列表
      // { type: 按钮类型，回调时以此作为区分依据，text: 按钮文案, color: 按钮文字颜色 }
      buttons = [],
      // 标题
      title = '',
      // 内容
      content = ' ',
      // 按钮是否展示为纵向
      buttonsShowVertical = false,
      // 是否展示确定
      showConfirm = true,
      // 确认按钮文案
      confirmText = '确定',
      // 确认按钮颜色
      confirmColor = '#3CC51F',
      // 是否展示取消
      showCancel = false,
      // 取消按钮文案
      cancelText = '取消',
      // 取消按钮颜色
      cancelColor = '#333'
    } = options;

    // 处理默认按钮的展示
    // 纵向排布确认按钮在上方
    let showCustomBtns = false;
    if (buttons.length === 0) {
      if (showConfirm) {
        buttons.push({
          type: 'confirm',
          text: confirmText,
          color: confirmColor
        });
      }

      if (showCancel) {
        const cancelButton = {
          type: 'cancel',
          text: cancelText,
          color: cancelColor
        };
        if (buttonsShowVertical) {
          buttons.push(cancelButton);
        } else {
          buttons.unshift(cancelButton);
        }
      }
    } else {
      showCustomBtns = true;
    }

    return new Promise((resolve, reject) => {
      this.setData({
        zanDialog: {
          show: true,
          showCustomBtns,
          buttons,
          title,
          content,
          buttonsShowVertical,
          showConfirm,
          confirmText,
          confirmColor,
          showCancel,
          cancelText,
          cancelColor,
          // 回调钩子
          resolve,
          reject
        }
      });
    });
  },

  _handleZanDialogButtonClick(e) {
    const { currentTarget = {} } = e;
    const { dataset = {} } = currentTarget;

    // 获取当次弹出框的信息
    const zanDialogData = this.data.zanDialog || {};
    const { resolve = _f, reject = _f } = zanDialogData;

    // 重置 zanDialog 里的内容
    this.setData({
      zanDialog: { show: false }
    });

    // 自定义按钮，全部 resolve 形式返回，根据 type 区分点击按钮
    if (zanDialogData.showCustomBtns) {
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
};
