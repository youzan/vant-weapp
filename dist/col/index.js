import { VantComponent } from '../common/component';
VantComponent({
    relations: {
        '../row/index': {
            type: 'ancestor'
        }
    },
    props: {
        span: Number,
        offset: Number
    },
    data: {
        style: ''
    },
    computed: {
        classes() {
            const { span, offset } = this.data;
            return this.classNames('custom-class', 'van-col', {
                [`van-col--${span}`]: span,
                [`van-col--offset-${offset}`]: offset
            });
        }
    },
    methods: {
        setGutter(gutter) {
            const padding = `${gutter / 2}px`;
            const style = gutter ? `padding-left: ${padding}; padding-right: ${padding};` : '';
            if (style !== this.data.style) {
                this.setData({ style });
            }
        }
    }
});
