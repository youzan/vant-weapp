const { extractComponentId } = require('../common/helper');

var Tab = {
  _handleZanTabChange(e) {
    const componentId = extractComponentId(e);
    const dataset = e.currentTarget.dataset;
    const selectedId = dataset.itemId;
    const data = { componentId, selectedId };

    
    if (this.handleZanTabChange) {
      this.handleZanTabChange(data);
    } else {
      console.warn('页面缺少 handleZanTabChange 回调函数');
    }
  }
};

module.exports = Tab;
