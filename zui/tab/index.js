var Tab = {
  _handleZuiTabChange(e) {
    var dataset = e.currentTarget.dataset;
    var componentId = dataset.componentId;
    var selectedId = dataset.itemId;

    if (this.handleZuiTabChange) {
      console.info('[ZUI:Tab:Change]', {
        componentId,
        selectedId
      });
      this.handleZuiTabChange({
        componentId,
        selectedId
      });
    }
  }
};

module.exports = Tab;
