import { VantComponent } from '../common/component';
VantComponent({
    props: {
        info: null,
        name: String,
        size: String,
        color: String,
        classPrefix: {
            type: String,
            value: 'van-icon'
        }
    },
    methods: {
        onClick() {
            this.$emit('click');
        }
    }
});
