export var link = Behavior({
  properties: {
    url: String,
    linkType: {
      type: String,
      value: 'navigateTo'
    }
  },
  methods: {
    jumpLink: function jumpLink(urlKey) {
      if (urlKey === void 0) {
        urlKey = 'url';
      }

      var url = this.data[urlKey];

      if (url) {
        wx[this.data.linkType]({
          url: url
        });
      }
    }
  }
});