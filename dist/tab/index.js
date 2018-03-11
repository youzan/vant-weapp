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
      
    }
  }
};

module.exports = Tab;
