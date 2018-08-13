'use strict';

Component({
  externalClasses: ['custom-class', 'title-class', 'label-class', 'value-class', 'left-icon-class', 'right-icon-class'],

  options: {
    multipleSlots: true
  },

  properties: {
    title: null,
    value: null,
    url: String,
    icon: String,
    label: String,
    center: Boolean,
    isLink: Boolean,
    required: Boolean,
    clickable: Boolean,
    titleWidth: String,
    customStyle: String,
    arrowDirection: String,
    linkType: {
      type: String,
      value: 'navigateTo'
    },
    border: {
      type: Boolean,
      value: true
    }
  },

  methods: {
    onClick: function onClick() {
      var url = this.data.url;

      if (url) {
        wx[this.data.linkType]({ url: url });
      }
      this.triggerEvent('click');
    }
  }
});