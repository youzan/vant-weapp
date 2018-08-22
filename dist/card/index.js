Component({
  options: {
    multipleSlots: true,
    addGlobalClass: true
  },

  externalClasses: [
    'custom-class',
    'thumb-class',
    'title-class',
    'price-class',
    'desc-class',
    'num-class'
  ],

  properties: {
    num: String,
    desc: String,
    thumb: String,
    title: String,
    price: String,
    centered: Boolean,
    currency: {
      type: String,
      default: '¥'
    }
  }
});
