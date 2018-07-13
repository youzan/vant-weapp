Component({
  behaviors: ['wx://form-field'],

  externalClasses: ['radio-class', 'radio-color'],

  properties: {
    items: Array,
    type: String
  },

  methods: {
    radioChange(e) {
      this.selectItem(e.detail.value)
      this.triggerEvent('change', e)
    },

    selectItem(value) {
      let { items } = this.data;

      items.forEach(item => {
        if ( item.name === value ) {
          item.checked = true;
        } else {
          item.checked = false;
        }
      })

      this.setData({ items })
    }
  }
});
