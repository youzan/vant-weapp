Page(Object.assign({}, {
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
    },
    stepper4: {
      stepper: 10,
      min: 1,
      max: 20,
      step: 2
    }
  },

  handleZanStepperChange(e) {
    const { componentId, stepper } = e.detail;

    this.setData({
      [`${componentId}.stepper`]: stepper
    });
  }
}));
