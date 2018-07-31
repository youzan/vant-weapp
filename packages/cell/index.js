Component({
  externalClasses: ['cell-class', 'title-class'],

  options: {
    multipleSlots: true
  },

  properties: {
    title: null,
    value: null,
    icon: String,
    label: String,
    center: Boolean,
    isLink: Boolean,
    required: Boolean,
    clickable: Boolean,
    arrowDirection: String,
    border: {
      type: Boolean,
      value: true
    }
  },

  methods: {
    onTap() {
      this.triggerEvent('tap');
      this.navigate();
    },

    navigate() {
      const { url = '' } = this.data;

      if (!this.data.isLink || !url || url === 'true' || url === 'false') return;

      wx[this.data.linkType].call(wx, { url });
    }
  }
});
