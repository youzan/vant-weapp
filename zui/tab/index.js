var Tab = {
  _handleZuiTabChange(e) {
    var dataset = e.currentTarget.dataset;
    var id = dataset.id;
    var selectedId = dataset.itemId;

    if (this.handleZuiTabChange) {
      this.handleZuiTabChange({
        id,
        selectedId
      });
    }
  }
};

module.exports = Tab;
