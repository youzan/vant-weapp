import { VantComponent } from '../common/component';

VantComponent({
  classes: [
    'thumb-class',
    'title-class',
    'price-class',
    'desc-class',
    'num-class'
  ],

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
    onClickThumb() {
      const { thumbLink } = this.data;
      if (thumbLink) {
        wx[this.data.linkType]({ url: thumbLink });
      }
    }
  }
});
