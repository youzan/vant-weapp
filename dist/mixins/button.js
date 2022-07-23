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
        onGetUserInfo(event) {
            this.triggerEvent('getuserinfo', event.detail);
        },
        onContact(event) {
            this.triggerEvent('contact', event.detail);
        },
        onGetPhoneNumber(event) {
            this.triggerEvent('getphonenumber', event.detail);
        },
        onError(event) {
            this.triggerEvent('error', event.detail);
        },
        onLaunchApp(event) {
            this.triggerEvent('launchapp', event.detail);
        },
        onOpenSetting(event) {
            this.triggerEvent('opensetting', event.detail);
        },
        onChooseAvatar(event) {
            this.triggerEvent('chooseavatar', event.detail);
        },
    },
});
