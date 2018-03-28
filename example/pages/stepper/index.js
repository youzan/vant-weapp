Page(Object.assign({}, {
  data: {
    stepper1: {
      stepper: 10,
      min: 1,
      max: 20
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

  handleZanStepperChange(e) {
    const componentId = e.target.dataset.componentId;
    const stepper = e.detail;

    this.setData({
      [`${componentId}.stepper`]: stepper
    });
  }
}));
