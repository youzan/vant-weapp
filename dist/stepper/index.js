import { VantComponent } from '../common/component';
VantComponent({
    field: true,
    classes: [
        'input-class',
        'plus-class',
        'minus-class'
    ],
    props: {
        value: null,
        integer: Boolean,
        disabled: Boolean,
        inputWidth: String,
        asyncChange: Boolean,
        disableInput: Boolean,
        min: {
            type: null,
            value: 1
        },
        max: {
            type: null,
            value: Number.MAX_SAFE_INTEGER
        },
        step: {
            type: null,
            value: 1
        }
    },
    computed: {
        minusDisabled() {
            return this.data.disabled || this.data.value <= this.data.min;
        },
        plusDisabled() {
            return this.data.disabled || this.data.value >= this.data.max;
        }
    },
    watch: {
        value(value) {
            if (value === '') {
                return;
            }
            const newValue = this.range(value);
            if (typeof newValue === 'number' && +this.data.value !== newValue) {
                this.set({ value: newValue });
            }
        }
    },
    data: {
        focus: false
    },
    created() {
        this.set({
            value: this.range(this.data.value)
        });
    },
    methods: {
        onFocus(event) {
            this.$emit('focus', event.detail);
        },
        onBlur(event) {
            const value = this.range(this.data.value);
            this.triggerInput(value);
            this.$emit('blur', event.detail);
        },
        // limit value range
        range(value) {
            value = String(value).replace(/[^0-9.-]/g, '');
            return Math.max(Math.min(this.data.max, value), this.data.min);
        },
        onInput(event) {
            const { value = '' } = event.detail || {};
            this.triggerInput(value);
        },
        onChange(type) {
            if (this.data[`${type}Disabled`]) {
                this.$emit('overlimit', type);
                return;
            }
            const diff = type === 'minus' ? -this.data.step : +this.data.step;
            const value = Math.round((this.data.value + diff) * 100) / 100;
            this.triggerInput(this.range(value));
            this.$emit(type);
        },
        onMinus() {
            this.onChange('minus');
        },
        onPlus() {
            this.onChange('plus');
        },
        triggerInput(value) {
            this.set({
                value: this.data.asyncChange ? this.data.value : value
            });
            this.$emit('change', value);
        }
    }
});
