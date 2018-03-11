const { extractComponentId } = require('../common/helper');

function handle(e) {
  const componentId = extractComponentId(e);
  const value = e.detail.value;

  callback.call(this, componentId, value);
}

function callback(componentId, value) {
  const e = { componentId, value };
  

  if (this.handleZanSelectChange) {
    this.handleZanSelectChange(e);
  } else {
    
  }
}

module.exports = {
  _handleZanSelectChange(e) {
    handle.call(this, e);
  }
};
