function handle(e) {
  var dataset = e.currentTarget.dataset;
  var componentId = dataset.componentId;
  var value = e.detail.value;

  callback.call(this, componentId, value);
}

function callback(componentId, value) {
  var e = { componentId, value };
  console.info('[zan:Select:change]', e);

  if (this.handleZanSelectChange) {
    this.handleZanSelectChange(e);
  } else {
    console.warn('页面缺少 handleZanSelectChange 回调函数');
  }
}

var Select = {
  _handleZanSelectChange(e) {
    handle.call(this, e);
  },
};

module.exports = Select;
