export const button = Behavior({
  properties: {
    id: String,
    loading: Boolean,
    openType: String,
    appParameter: String,
    sendMessageTitle: String,
    sendMessagePath: String,
    sendMessageImg: String,
    showMessageCard: String,
    hoverStopPropagation: Boolean,
    hoverStartTime: {
      type: Number,
      value: 20
    },
    hoverStayTime: {
      type: Number,
      value: 70
    },
    lang: {
      type: String,
      value: 'en'
    },
    sessionFrom: {
      type: String,
      value: ''
    }
  },

  methods: {
    bindgetuserinfo(event: Partial<Weapp.Event>) {
      this.$emit('getuserinfo', event.detail);
    },

    bindcontact(event: Partial<Weapp.Event>) {
      this.$emit('contact', event.detail);
    },

    bindgetphonenumber(event: Partial<Weapp.Event>) {
      this.$emit('getphonenumber', event.detail);
    },

    bindopensetting(event: Partial<Weapp.Event>) {
      this.$emit('opensetting', event.detail);
    },

    binderror(event: Partial<Weapp.Event>) {
      this.$emit('error', event.detail);
    }
  }
});
