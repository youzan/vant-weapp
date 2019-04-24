import { VantComponent } from '../common/component';
import { safeArea } from '../mixins/safe-area';
VantComponent({
    mixins: [safeArea()],
    classes: [
        'bar-class',
        'price-class',
        'button-class'
    ],
    props: {
        tip: null,
        type: Number,
        price: null,
        label: String,
        loading: Boolean,
        disabled: Boolean,
        buttonText: String,
        currency: {
            type: String,
            value: '¥'
        },
        buttonType: {
            type: String,
            value: 'danger'
        },
        decimalLength: {
            type: Number,
            value: 2
        }
    },
    computed: {
        hasPrice() {
            return typeof this.data.price === 'number';
        },
        priceStr() {
            return (this.data.price / 100).toFixed(this.data.decimalLength);
        },
        tipStr() {
            const { tip } = this.data;
            return typeof tip === 'string' ? tip : '';
        }
    },
    methods: {
        onSubmit(event) {
            this.$emit('submit', event.detail);
        }
    }
});
