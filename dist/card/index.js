import { VantComponent } from '../common/component';
VantComponent({
  classes: ['thumb-class', 'title-class', 'price-class', 'desc-class', 'num-class'],
  props: {
    tag: String,
    num: String,
    desc: String,
    thumb: String,
    title: String,
    price: String,
    centered: Boolean,
    lazyLoad: Boolean,
    thumbLink: String,
    linkType: {
      type: String,
      value: 'navigateTo'
    },
    currency: {
      type: String,
      value: '¥'
    }
  },
  methods: {
    onClickThumb: function onClickThumb() {
      var thumbLink = this.data.thumbLink;

      if (thumbLink) {
        wx[this.data.linkType]({
          url: thumbLink
        });
      }
    }
  }
});