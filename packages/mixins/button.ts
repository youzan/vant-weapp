import { canIUseGetUserProfile } from '../common/version';

export const button = Behavior({
  externalClasses: ['hover-class'],

  properties: {
    id: String,
    lang: String,
    businessId: Number,
    sessionFrom: String,
    sendMessageTitle: String,
    sendMessagePath: String,
    sendMessageImg: String,
    showMessageCard: Boolean,
    appParameter: String,
    ariaLabel: String,
    openType: String,
    getUserProfileDesc: String,
  },

  data: {
    canIUseGetUserProfile: canIUseGetUserProfile(),
  },

  methods: {
    onGetUserInfo(event: WechatMiniprogram.ButtonGetUserInfo) {
      this.triggerEvent('getuserinfo', event.detail);
    },

    onContact(event: WechatMiniprogram.ButtonContact) {
      this.triggerEvent('contact', event.detail);
    },

    onGetPhoneNumber(event: WechatMiniprogram.ButtonGetPhoneNumber) {
      this.triggerEvent('getphonenumber', event.detail);
    },

    onError(event: WechatMiniprogram.ButtonError) {
      this.triggerEvent('error', event.detail);
    },

    onLaunchApp(event: WechatMiniprogram.ButtonLaunchApp) {
      this.triggerEvent('launchapp', event.detail);
    },

    onOpenSetting(event: WechatMiniprogram.ButtonOpenSetting) {
      this.triggerEvent('opensetting', event.detail);
    },
  },
});
