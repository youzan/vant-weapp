Component({
  properties: {
    checked: {
      type: Boolean,
      value: true
    }
  },

  methods: {
    handleClick() {
      this.setData({
        checked: !this.data.checked
      })
    }
  }
});
