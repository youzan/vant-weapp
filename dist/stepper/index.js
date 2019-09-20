import { VantComponent } from '../common/component';
import { addUnit } from '../common/utils';
const LONG_PRESS_START_TIME = 600;
const LONG_PRESS_INTERVAL = 200;
VantComponent({
    field: true,
    classes: ['input-class', 'plus-class', 'minus-class'],
    props: {
        value: null,
        integer: Boolean,
        disabled: Boolean,
        inputWidth: null,
        buttonSize: null,
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
        },
        showPlus: {
            type: Boolean,
            value: true
        },
        showMinus: {
            type: Boolean,
            value: true
        }
    },
    watch: {
        value(value) {
            if (value === '') {
                return;
            }
            const newValue = this.range(value);
            if (typeof newValue === 'number' && +this.data.value !== newValue) {
                this.setData({ value: newValue });
            }
        },
        inputWidth() {
            this.set({
                inputStyle: this.computeInputStyle()
            });
        },
        buttonSize() {
            this.set({
                inputStyle: this.computeInputStyle(),
                buttonStyle: this.computeButtonStyle()
            });
        }
    },
    data: {
        focus: false,
        inputStyle: '',
        buttonStyle: ''
    },
    created() {
        this.setData({
            value: this.range(this.data.value)
        });
    },
    methods: {
        isDisabled(type) {
            if (type === 'plus') {
                return this.data.disabled || this.data.value >= this.data.max;
            }
            return this.data.disabled || this.data.value <= this.data.min;
        },
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
        onChange() {
            const { type } = this;
            if (this.isDisabled(type)) {
                this.$emit('overlimit', type);
                return;
            }
            const diff = type === 'minus' ? -this.data.step : +this.data.step;
            const value = Math.round((+this.data.value + diff) * 100) / 100;
            this.triggerInput(this.range(value));
            this.$emit(type);
        },
        longPressStep() {
            this.longPressTimer = setTimeout(() => {
                this.onChange();
                this.longPressStep();
            }, LONG_PRESS_INTERVAL);
        },
        onTap(event) {
            const { type } = event.currentTarget.dataset;
            this.type = type;
            this.onChange();
        },
        onTouchStart(event) {
            clearTimeout(this.longPressTimer);
            const { type } = event.currentTarget.dataset;
            this.type = type;
            this.isLongPress = false;
            this.longPressTimer = setTimeout(() => {
                this.isLongPress = true;
                this.onChange();
                this.longPressStep();
            }, LONG_PRESS_START_TIME);
        },
        onTouchEnd() {
            clearTimeout(this.longPressTimer);
        },
        triggerInput(value) {
            this.setData({
                value: this.data.asyncChange ? this.data.value : value
            });
            this.$emit('change', value);
        },
        computeInputStyle() {
            let style = '';
            if (this.data.inputWidth) {
                style = `width: ${addUnit(this.data.inputWidth)};`;
            }
            if (this.data.buttonSize) {
                style += `height: ${addUnit(this.data.buttonSize)};`;
            }
            return style;
        },
        computeButtonStyle() {
            let style = '';
            const size = addUnit(this.data.buttonSize);
            if (this.data.buttonSize) {
                style = `width: ${size};height: ${size};`;
            }
            return style;
        }
    }
});
