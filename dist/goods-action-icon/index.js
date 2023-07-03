import { VantComponent } from '../common/component';
import { button } from '../mixins/button';
import { link } from '../mixins/link';
VantComponent({
    classes: ['icon-class', 'text-class', 'info-class'],
    mixins: [link, button],
    props: {
        text: String,
        dot: Boolean,
        info: String,
        icon: String,
        size: String,
        color: String,
        classPrefix: {
            type: String,
            value: 'van-icon',
        },
        disabled: Boolean,
        loading: Boolean,
    },
    methods: {
        onClick(event) {
            this.$emit('click', event.detail);
            this.jumpLink();
        },
    },
});
