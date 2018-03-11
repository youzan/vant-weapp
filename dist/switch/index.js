var Switch = {
  _handleZanSwitchChange(e) {
    var dataset = e.currentTarget.dataset;

    var checked = !dataset.checked;
    var loading = dataset.loading;
    var disabled = dataset.disabled;
    var componentId = dataset.componentId;

    if (loading || disabled) return;

    

    if (this.handleZanSwitchChange) {
      this.handleZanSwitchChange({
        checked,
        componentId
      });
    } else {
      
    }
  }
};

module.exports = Switch;
