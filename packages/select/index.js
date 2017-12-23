const { extractComponentId } = require('../common/helper');

function handle(e) {
  const componentId = extractComponentId(e);
  const value = e.detail.value;

  callback.call(this, componentId, value);
}

function callback(componentId, value) {
  const e = { componentId, value };
  console.info('[zan:Select:change]', e);

  if (this.handleZanSelectChange) {
    this.handleZanSelectChange(e);
  } else {
    console.warn('页面缺少 handleZanSelectChange 回调函数');
  }
}

module.exports = {
  _handleZanSelectChange(e) {
    handle.call(this, e);
  }
};
