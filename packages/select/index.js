Component({
  properties: {
    items: {
      type: Array,
      value: []
    },
    name: {
      type: String,
      value: ''
    },
    checkedValue: {
      type: String,
      value: ''
    },
    activeColor: {
      type: String,
      value: '#ff4444'
    }
  },

  methods: {
    handleSelectChange({ detail }) {
      const { value } = detail;
      this.triggerEvent('change', { value });
    }
  }
});
