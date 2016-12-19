var ZUI = require('../../zui/index');

Page(Object.assign({}, ZUI.Quantity, {
  data: {
    quantity1: {
      quantity: 1,
      min: 1,
      max: 20
    },
    quantity2: {
      quantity: 1,
      min: 1,
      max: 1
    }
  },

  handleZuiQuantityChange(e) {
    var componentId = e.componentId;
    var quantity = e.quantity;

    this.setData({
      [`${componentId}.quantity`]: quantity
    });
  }
}));
