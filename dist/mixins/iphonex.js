let isIPhoneX = null;
function getIsIPhoneX() {
    return new Promise((resolve, reject) => {
        if (isIPhoneX !== null) {
            resolve(isIPhoneX);
        }
        else {
            wx.getSystemInfo({
                success: ({ model, screenHeight }) => {
                    const iphoneX = /iphone x/i.test(model);
                    const iphoneNew = /iPhone11/i.test(model) && screenHeight === 812;
                    isIPhoneX = iphoneX || iphoneNew;
                    resolve(isIPhoneX);
                },
                fail: reject
            });
        }
    });
}
export const iphonex = Behavior({
    properties: {
        safeAreaInsetBottom: {
            type: Boolean,
            value: true
        }
    },
    created() {
        getIsIPhoneX().then(isIPhoneX => {
            this.set({ isIPhoneX });
        });
    }
});
