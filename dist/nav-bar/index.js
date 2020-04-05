import { VantComponent } from '../common/component';
VantComponent({
    classes: ['title-class'],
    props: {
        title: String,
        fixed: {
            type: Boolean,
            observer: 'setHeight'
        },
        placeholder: {
            type: Boolean,
            observer: 'setHeight'
        },
        leftText: String,
        rightText: String,
        leftArrow: Boolean,
        border: {
            type: Boolean,
            value: true
        },
        zIndex: {
            type: Number,
            value: 1
        },
        safeAreaInsetTop: {
            type: Boolean,
            value: true
        }
    },
    data: {
        statusBarHeight: 0,
        height: 44
    },
    created() {
        const { statusBarHeight } = wx.getSystemInfoSync();
        this.setData({
            statusBarHeight,
            height: 44 + statusBarHeight
        });
    },
    mounted() {
        this.setHeight();
    },
    methods: {
        onClickLeft() {
            this.$emit('click-left');
        },
        onClickRight() {
            this.$emit('click-right');
        },
        setHeight() {
            if (!this.data.fixed || !this.data.placeholder) {
                return;
            }
            wx.nextTick(() => {
                this.getRect('.van-nav-bar').then((res) => {
                    this.setData({ height: res.height });
                });
            });
        }
    }
});
