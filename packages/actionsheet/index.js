const { extractComponentId } = require('../common/helper');

module.exports = {
  _handleZanActionsheetMaskClick({ currentTarget = {} }) {
    const dataset = currentTarget.dataset || {};
    const { componentId, closeOnClickOverlay } = dataset;

    // 判断是否在点击背景时需要关闭弹层
    if (!closeOnClickOverlay) {
      return;
    }

    resolveCancelClick.call(this, { componentId });
  },

  _handleZanActionsheetCancelBtnClick(e) {
    const componentId = extractComponentId(e);

    resolveCancelClick.call(this, { componentId });
  },

  _handleZanActionsheetBtnClick({ currentTarget = {} }) {
    const dataset = currentTarget.dataset || {};
    const { componentId, index } = dataset;

    if (this.handleZanActionsheetClick) {
      this.handleZanActionsheetClick({ componentId, index });
    } else {
      console.warn('页面缺少 handleZanActionsheetClick 回调函数');
    }
  }
};

function resolveCancelClick({ componentId }) {
  console.info('[zan:actionsheet:cancel]');
  if (this.handleZanActionsheetCancel) {
    this.handleZanActionsheetCancel({ componentId });
  } else {
    console.warn('页面缺少 handleZanActionsheetCancel 回调函数');
  }
}
