import { VantComponent } from '../common/component';
VantComponent({
    props: {
        dot: Boolean,
        info: null,
        size: null,
        color: String,
        customStyle: String,
        classPrefix: {
            type: String,
            value: 'van-icon',
        },
        name: String,
    },
    methods: {
        onClick() {
            this.$emit('click');
        },
    },
});
