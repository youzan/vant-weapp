function handle(e, num) {
  var dataset = e.currentTarget.dataset;
  var componentId = dataset.componentId;
  var disabled = dataset.disabled;
  var quantity = +dataset.quantity;

  if (disabled == 'true') return null;

  callback.call(this, componentId, quantity + num);
}

function callback(componentId, quantity) {
  if (this.handleZuiQuantityChange) {
    quantity = +quantity;
    var e = { componentId, quantity };
    console.info('[ZUI:Quantity:Change]', e);
    this.handleZuiQuantityChange(e);
  }
}

var ComponentQuantity = {
  _handleZuiQuantityMinus(e) {
    handle.call(this, e, -1);
  },

  _handleZuiQuantityPlus(e) {
    handle.call(this, e, +1);
  },

  _handleZuiQuantityBlur(e) {
    var dataset = e.currentTarget.dataset;
    var componentId = dataset.componentId;
    var max = +dataset.max;
    var min = +dataset.min;
    var value = e.detail.value;

    if (!value) {
      setTimeout(() => {
        callback.call(this, componentId, min);
      }, 16);
      callback.call(this, componentId, value);
      return '' + value;
    }

    value = +value;
    if (value > max) {
      value = max;
    } else if (value < min) {
      value = min;
    }

    callback.call(this, componentId, value);

    return '' + value;
  }
};

module.exports = ComponentQuantity;
