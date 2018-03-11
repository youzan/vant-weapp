function handle(e, num) {
  var dataset = e.currentTarget.dataset;
  var componentId = dataset.componentId;
  var disabled = dataset.disabled;
  var stepper = +dataset.stepper;

  if (disabled) return null;

  callback.call(this, componentId, stepper + num);
}

function callback(componentId, stepper) {
  stepper = +stepper;
  var e = { componentId, stepper };
  

  if (this.handleZanStepperChange) {
    this.handleZanStepperChange(e);
  } else {
    console.warn('页面缺少 handleZanStepperChange 回调函数');
  }
}

var Stepper = {
  _handleZanStepperMinus(e) {
    handle.call(this, e, -1);
  },

  _handleZanStepperPlus(e) {
    handle.call(this, e, +1);
  },

  _handleZanStepperBlur(e) {
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

module.exports = Stepper;
