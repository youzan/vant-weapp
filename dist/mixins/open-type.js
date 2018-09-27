export var openType = Behavior({
  properties: {
    openType: String
  },
  methods: {
    bindGetUserInfo: function bindGetUserInfo(event) {
      this.$emit('getuserinfo', event.detail);
    },
    bindContact: function bindContact(event) {
      this.$emit('contact', event.detail);
    },
    bindGetPhoneNumber: function bindGetPhoneNumber(event) {
      this.$emit('getphonenumber', event.detail);
    },
    bindOpenSetting: function bindOpenSetting(event) {
      this.$emit('opensetting', event.detail);
    },
    bindError: function bindError(event) {
      this.$emit('error', event.detail);
    }
  }
});