export const link = Behavior({
    properties: {
        url: String,
        linkType: {
            type: String,
            value: 'navigateTo',
        },
    },
    methods: {
        jumpLink(urlKey = 'url') {
            const url = this.data[urlKey];
            if (url) {
                if (this.data.linkType === 'navigateTo' &&
                    getCurrentPages().length > 9) {
                    wx.redirectTo({ url });
                }
                else {
                    wx[this.data.linkType]({ url });
                }
            }
        },
    },
});
