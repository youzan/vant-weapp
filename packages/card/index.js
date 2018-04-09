Component({
  options: {
    multipleSlots: true
  },

  externalClasses: ['card-class'],

  properties: {
    useThumbSlot: {
      type: Boolean,
      value: false
    },
    useDetailSlot: {
      type: Boolean,
      value: false
    },
    thumb: String,
    price: String,
    title: String,
    num: Number,
    desc: String,
    status: String
  }
});
