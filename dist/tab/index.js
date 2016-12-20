var Tab = {
  _handleZuiTabChange(e) {
    var dataset = e.currentTarget.dataset;
    var componentId = dataset.componentId;
    var selectedId = dataset.itemId;
    var data = { componentId, selectedId };

    console.info('[zui:tab:change]', data);
    if (this.handleZuiTabChange) {
      this.handleZuiTabChange(data);
    } else {
      console.warn('页面缺少 handleZuiTabChange 回调函数');
    }
  }
};

module.exports = Tab;
