var Zan = require('../../dist/index');

Page(Object.assign({}, Zan.Stepper, {
  data: {
    stepper1: {
      stepper: 10,
      min: 1,
      max: 20
    },
    stepper2: {
      stepper: 1,
      min: 1,
      max: 1
    },
    stepper3: {
      stepper: 10,
      min: 1,
      max: 20
    }
  },

  handleZanStepperChange(e) {
    var componentId = e.componentId;
    var stepper = e.stepper;

    this.setData({
      [`${componentId}.stepper`]: stepper
    });
  }
}));
