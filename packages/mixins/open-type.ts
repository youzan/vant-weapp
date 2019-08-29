import { Weapp } from 'definitions/weapp';

export const openType = Behavior({
  properties: {
    openType: String
  },

  methods: {
    bindGetUserInfo(event: Partial<Weapp.Event>) {
      this.$emit('getuserinfo', event.detail);
    },

    bindContact(event: Partial<Weapp.Event>) {
      this.$emit('contact', event.detail);
    },

    bindGetPhoneNumber(event: Partial<Weapp.Event>) {
      this.$emit('getphonenumber', event.detail);
    },

    bindError(event: Partial<Weapp.Event>) {
      this.$emit('error', event.detail);
    },

    bindLaunchApp(event: Partial<Weapp.Event>) {
      this.$emit('launchapp', event.detail);
    },

    bindOpenSetting(event: Partial<Weapp.Event>) {
      this.$emit('opensetting', event.detail);
    },
  }
});
