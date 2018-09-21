import { VantComponent } from '../common/component';
import { button } from '../mixins/button';
VantComponent({
    mixins: [button],
    props: {
        plain: Boolean,
        block: Boolean,
        square: Boolean,
        loading: Boolean,
        disabled: Boolean,
        type: {
            type: String,
            value: 'default'
        },
        size: {
            type: String,
            value: 'normal'
        }
    },
    computed: {
        classes() {
            const { type, size, plain, disabled, loading, square, block } = this.data;
            return this.classNames(`van-button--${type}`, `van-button--${size}`, {
                'van-button--block': block,
                'van-button--plain': plain,
                'van-button--square': square,
                'van-button--loading': loading,
                'van-button--disabled': disabled,
                'van-button--unclickable': disabled || loading
            });
        }
    },
    methods: {
        onClick() {
            if (!this.data.disabled && !this.data.loading) {
                this.$emit('click');
            }
        }
    }
});
