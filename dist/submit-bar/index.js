import { VantComponent } from '../common/component';
VantComponent({
    classes: ['bar-class', 'price-class', 'button-class'],
    props: {
        tip: {
            type: null,
            observer: 'updateTip',
        },
        tipIcon: String,
        type: Number,
        price: {
            type: null,
            observer: 'updatePrice',
        },
        label: String,
        loading: Boolean,
        disabled: Boolean,
        buttonText: String,
        currency: {
            type: String,
            value: '¥',
        },
        buttonType: {
            type: String,
            value: 'danger',
        },
        decimalLength: {
            type: Number,
            value: 2,
            observer: 'updatePrice',
        },
        suffixLabel: String,
        safeAreaInsetBottom: {
            type: Boolean,
            value: true,
        },
    },
    methods: {
        updatePrice() {
            const { price, decimalLength } = this.data;
            const priceStrArr = typeof price === 'number' &&
                (price / 100).toFixed(decimalLength).split('.');
            this.setData({
                hasPrice: typeof price === 'number',
                integerStr: priceStrArr && priceStrArr[0],
                decimalStr: decimalLength && priceStrArr ? `.${priceStrArr[1]}` : '',
            });
        },
        updateTip() {
            this.setData({ hasTip: typeof this.data.tip === 'string' });
        },
        onSubmit(event) {
            this.$emit('submit', event.detail);
        },
    },
});
