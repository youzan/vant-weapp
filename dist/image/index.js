import { addUnit, isDef } from '../common/utils';
import { VantComponent } from '../common/component';
import { button } from '../mixins/button';
import { openType } from '../mixins/open-type';
VantComponent({
    mixins: [button, openType],
    classes: ['custom-class', 'loading-class', 'error-class', 'image-class'],
    props: {
        src: String,
        width: String,
        height: String,
        fit: {
            type: String,
            value: 'fill'
        },
        round: Boolean,
        lazyLoad: Boolean,
        showError: {
            type: Boolean,
            value: true
        },
        showLoading: {
            type: Boolean,
            value: true
        },
        showMenuByLongpress: Boolean,
        // 受小程序slot限制所需要的属性
        useLoadingSlot: Boolean,
        useErrorSlot: Boolean,
    },
    data: {
        fitWeapp: 'aspectFit',
        FIT_MODE_MAP: {
            contain: 'aspectFit',
            cover: 'aspectFill',
            fill: 'scaleToFill',
            none: 'center',
            // TODO: 这个没有原生的属性，需要后面实现，暂时先用contain;
            'scale-down': 'aspectFit'
        },
        loading: true,
        error: false
    },
    watch: {
        src() {
            this.setData({
                loading: true,
                error: false
            });
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            const { FIT_MODE_MAP, fit } = this.data;
            this.setData({
                mode: FIT_MODE_MAP[fit],
                style: this.getStyle(),
            });
        },
        getStyle() {
            const { width, height } = this.data;
            let style = '';
            if (isDef(width)) {
                style += `width: ${addUnit(width)};`;
            }
            if (isDef(height)) {
                style += `height: ${addUnit(height)};`;
            }
            return style;
        },
        onLoad(event) {
            this.setData({
                loading: false
            });
            this.$emit('load', event.detail);
        },
        onError(event) {
            this.setData({
                loading: false,
                error: true,
            });
            this.$emit('error', event.detail);
        },
        onClick(event) {
            this.$emit('click', event.detail);
        },
    }
});
