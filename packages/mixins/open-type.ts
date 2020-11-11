// @ts-nocheck

export const openType = Behavior({
  properties: {
    openType: String,
  },

  methods: {
    bindGetUserInfo(event: WechatMiniprogram.ButtonGetUserInfo) {
      this.$emit('getuserinfo', event.detail);
    },

    bindContact(event: WechatMiniprogram.ButtonContact) {
      this.$emit('contact', event.detail);
    },

    bindGetPhoneNumber(event: WechatMiniprogram.ButtonGetPhoneNumber) {
      this.$emit('getphonenumber', event.detail);
    },

    bindError(event: WechatMiniprogram.ButtonError) {
      this.$emit('error', event.detail);
    },

    bindLaunchApp(event: WechatMiniprogram.ButtonLaunchApp) {
      this.$emit('launchapp', event.detail);
    },

    bindOpenSetting(event: WechatMiniprogram.ButtonOpenSetting) {
      this.$emit('opensetting', event.detail);
    },
  },
});
