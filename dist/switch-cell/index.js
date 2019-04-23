import { VantComponent } from '../common/component';
VantComponent({
    field: true,
    props: {
        value: null,
        title: String,
        border: Boolean,
        checked: Boolean,
        loading: Boolean,
        disabled: Boolean,
        activeColor: String,
        inactiveColor: String,
        size: {
            type: String,
            value: '24px'
        },
        activeValue: {
            type: null,
            value: true
        },
        inactiveValue: {
            type: null,
            value: false
        }
    },
    watch: {
        checked(value) {
            this.set({ value });
        }
    },
    created() {
        this.set({ value: this.data.checked });
    },
    methods: {
        onChange(event) {
            this.$emit('change', event.detail);
        }
    }
});
