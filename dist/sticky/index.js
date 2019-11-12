import { VantComponent } from '../common/component';
VantComponent({
    props: {
        zIndex: {
            type: Number,
            value: 99
        },
        offsetTop: {
            type: Number,
            value: 0
        },
        disabled: Boolean
    },
    data: {
        wrapStyle: '',
        containerStyle: ''
    },
    methods: {
        setStyle() {
            const { offsetTop, height, fixed, zIndex } = this.data;
            if (fixed) {
                this.setData({
                    wrapStyle: `top: ${offsetTop}px;`,
                    containerStyle: `height: ${height}px; z-index: ${zIndex};`
                });
            }
            else {
                this.setData({
                    wrapStyle: '',
                    containerStyle: ''
                });
            }
        },
        observerContentScroll() {
            const { offsetTop } = this.data;
            const intersectionObserver = this.createIntersectionObserver({
                thresholds: [0, 1]
            });
            this.intersectionObserver = intersectionObserver;
            intersectionObserver.relativeToViewport({ top: -offsetTop });
            intersectionObserver.observe('.van-sticky', (res) => {
                if (this.data.disabled) {
                    return;
                }
                // @ts-ignore
                const { top, height } = res.boundingClientRect;
                const fixed = top <= offsetTop;
                this.$emit('scroll', {
                    scrollTop: top,
                    isFixed: fixed
                });
                this.setData({ fixed, height });
                wx.nextTick(() => {
                    this.setStyle();
                });
            });
        }
    },
    mounted() {
        this.observerContentScroll();
    },
    destroyed() {
        this.intersectionObserver.disconnect();
    }
});
