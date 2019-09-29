import { VantComponent } from '../common/component';
import { nextTick } from '../common/utils';
VantComponent({
    props: {
        zIndex: {
            type: Number,
            value: 99
        },
        offsetTop: {
            type: Number,
            value: 0
        }
    },
    data: {
        position: '',
        height: 0,
        wrapStyle: '',
        containerStyle: ''
    },
    methods: {
        setWrapStyle() {
            const { offsetTop, position } = this.data;
            let wrapStyle;
            let containerStyle;
            switch (position) {
                case 'top':
                    wrapStyle = `
            top: ${offsetTop}px;
            position: fixed;
          `;
                    containerStyle = `height: ${this.itemHeight}px;`;
                    break;
                case 'bottom':
                    wrapStyle = `
            top: auto;
            bottom: 0;
          `;
                    containerStyle = '';
                    break;
                default:
                    wrapStyle = '';
                    containerStyle = '';
            }
            const data = {};
            if (wrapStyle !== this.data.wrapStyle) {
                data.wrapStyle = wrapStyle;
            }
            if (containerStyle !== this.data.containerStyle) {
                data.containerStyle = containerStyle;
            }
            if (JSON.stringify(data) !== '{}') {
                this.setData(data);
            }
        },
        setPosition(position) {
            if (position !== this.data.position) {
                this.setData({ position });
                nextTick(() => {
                    this.setWrapStyle();
                });
            }
        },
        observerContentScroll() {
            const { offsetTop = 0 } = this.data;
            const { windowHeight } = wx.getSystemInfoSync();
            this.createIntersectionObserver({}).disconnect();
            // @ts-ignore
            this.createIntersectionObserver()
                .relativeToViewport({ top: -(this.itemHeight + offsetTop) })
                .observe('.van-sticky', (res) => {
                const { top } = res.boundingClientRect;
                if (top > offsetTop) {
                    return;
                }
                const position = 'top';
                this.$emit('scroll', {
                    scrollTop: top + offsetTop,
                    isFixed: true
                });
                this.setPosition(position);
            });
            // @ts-ignore
            this.createIntersectionObserver()
                .relativeToViewport({ bottom: -(windowHeight - 1 - offsetTop) })
                .observe('.van-sticky', (res) => {
                const { top, bottom } = res.boundingClientRect;
                if (bottom <= this.itemHeight - 1) {
                    return;
                }
                const position = res.intersectionRatio > 0 ? 'top' : '';
                this.$emit('scroll', {
                    scrollTop: top + offsetTop,
                    isFixed: position === 'top'
                });
                this.setPosition(position);
            });
        }
    },
    mounted() {
        this.getRect('.van-sticky').then((rect) => {
            this.itemHeight = rect.height;
            this.itemTop = rect.top;
            this.observerContentScroll();
        });
    },
    destroyed() {
        this.createIntersectionObserver({}).disconnect();
    }
});
