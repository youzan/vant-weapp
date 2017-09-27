function handle(e) {
  var dataset = e.currentTarget.dataset;
  var componentId = dataset.componentId;
  var value = e.detail.value;

  callback.call(this, componentId, value);
}

function callback(componentId, value) {
  var e = { componentId, value };
  console.info('[zan:CheckLabel:select]', e);

  if (this.handleZanCheckLabelSelect) {
    this.handleZanCheckLabelSelect(e);
  } else {
    console.warn('页面缺少 handleZanCheckLabelSelect 回调函数');
  }
}

var CheckLabel = {
  _handleZanCheckLabelSelect(e) {
    handle.call(this, e);
  },
};

module.exports = CheckLabel;
