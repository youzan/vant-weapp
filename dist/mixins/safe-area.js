let cache = null;
function getSafeArea() {
    return new Promise((resolve, reject) => {
        if (cache != null) {
            resolve(cache);
        }
        else {
            wx.getSystemInfo({
                success: ({ model, statusBarHeight }) => {
                    const deviceType = model.replace(/\s/g, '-');
                    const iphoneNew = /iphone-x|iPhone11|iPhone12/i.test(deviceType);
                    cache = {
                        isIPhoneX: iphoneNew,
                        statusBarHeight
                    };
                    resolve(cache);
                },
                fail: reject
            });
        }
    });
}
export const safeArea = ({ safeAreaInsetBottom = true, safeAreaInsetTop = false } = {}) => Behavior({
    properties: {
        safeAreaInsetTop: {
            type: Boolean,
            value: safeAreaInsetTop
        },
        safeAreaInsetBottom: {
            type: Boolean,
            value: safeAreaInsetBottom
        }
    },
    created() {
        getSafeArea().then(({ isIPhoneX, statusBarHeight }) => {
            this.set({ isIPhoneX, statusBarHeight });
        });
    }
});
