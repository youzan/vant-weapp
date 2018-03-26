Component({
  properties: {
    size: String,
    stepper: {
      type: Number,
      value: 1
    },
    min: {
      type: Number,
      value: 1
    },
    max: {
      type: Number,
      value: Infinity
    },
    componentId: String,
    step: {
      type: Number,
      value: 1
    }
  },

  methods: {
    handleZanStepperChange(e, type) {
      const dataset = e.currentTarget.dataset;
      const disabled = dataset.disabled;
      const { step, componentId } = this.data;
      let stepper = this.data.stepper;

      if (disabled) return null;

      if (type === 'minus') {
        stepper -= step;
      } else if (type === 'plus') {
        stepper += step;
      }

      this.triggerEvent('change', {
        componentId,
        stepper
      });
      this.triggerEvent(type);
    },

    handleZanStepperMinus(e) {
      this.handleZanStepperChange(e, 'minus');
    },
  
    handleZanStepperPlus(e) {
      this.handleZanStepperChange( e, 'plus');
    },
  
    handleZanStepperBlur(e) {
      const dataset = e.currentTarget.dataset;
      let value = e.detail.value;
      const { componentId, min, max } = this.data;
  
      if (!value) {
        setTimeout(() => {
          this.triggerEvent('change', {
            componentId,
            stepper: min
          });
        }, 16);
        return;
      }
  
      value = +value;
      if (value > max) {
        value = max;
      } else if (value < min) {
        value = min;
      }
  
      this.triggerEvent('change', {
        componentId,
        stepper: value
      });
    }
  }
});
