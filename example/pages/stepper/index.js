Page(Object.assign({}, {
  data: {
    stepper1: {
      stepper: 10,
      min: 1
    },
    stepper2: {
      stepper: 10,
      min: 1,
      max: 20
    },
    stepper3: {
      stepper: 10,
      min: 1,
      max: 20,
      step: 2
    }
  },

  handleZanStepperChange({
    detail: stepper,
    target: {
      dataset: {
        componentId
      }
    }
  }) {
    this.setData({
      [`${componentId}.stepper`]: stepper
    });
  }
}));
