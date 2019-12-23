export const behavior = Behavior({
    methods: {
        set(data, callback) {
            this.setData(data, callback);
            return new Promise(resolve => wx.nextTick(resolve));
        }
    }
});
