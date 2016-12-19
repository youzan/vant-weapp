var Tab = {
  _handleZuiTabChange(e) {
    var dataset = e.currentTarget.dataset;
    var componentId = dataset.componentId;
    var selectedId = dataset.itemId;

    if (this.handleZuiTabChange) {
      this.handleZuiTabChange({
        componentId,
        selectedId
      });
    }
  }
};

module.exports = Tab;
