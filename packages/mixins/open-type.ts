// @ts-nocheck

export const openType = Behavior({
  properties: {
    openType: String,
  },

  methods: {
    bindGetUserInfo(event: WechatMiniprogram.TapEvent) {
      this.$emit('getuserinfo', event.detail);
    },

    bindContact(event: WechatMiniprogram.TapEvent) {
      this.$emit('contact', event.detail);
    },

    bindGetPhoneNumber(event: WechatMiniprogram.TapEvent) {
      this.$emit('getphonenumber', event.detail);
    },

    bindError(event: WechatMiniprogram.TapEvent) {
      this.$emit('error', event.detail);
    },

    bindLaunchApp(event: WechatMiniprogram.TapEvent) {
      this.$emit('launchapp', event.detail);
    },

    bindOpenSetting(event: WechatMiniprogram.TapEvent) {
      this.$emit('opensetting', event.detail);
    },
  },
});
