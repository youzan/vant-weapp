var Tab = {
  _handleZanTabChange(e) {
    var dataset = e.currentTarget.dataset;
    var componentId = dataset.componentId;
    var selectedId = dataset.itemId;
    var data = { componentId, selectedId };

    console.info('[zan:tab:change]', data);
    if (this.handleZanTabChange) {
      this.handleZanTabChange(data);
    } else {
      console.warn('页面缺少 handleZanTabChange 回调函数');
    }
  }
};

module.exports = Tab;
