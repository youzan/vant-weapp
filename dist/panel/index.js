Component({
  externalClasses: [
    'custom-class',
    'footer-class'
  ],

  options: {
    multipleSlots: true,
    addGlobalClass: true
  },

  properties: {
    desc: String,
    title: String,
    status: String,
    headerClass: String,
    useFooterSlot: Boolean
  }
});
