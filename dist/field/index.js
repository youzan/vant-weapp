import { VantComponent } from '../common/component';
VantComponent({
    field: true,
    classes: ['input-class', 'right-icon-class'],
    props: {
        size: String,
        icon: String,
        label: String,
        error: Boolean,
        fixed: Boolean,
        focus: Boolean,
        center: Boolean,
        isLink: Boolean,
        leftIcon: String,
        rightIcon: String,
        disabled: Boolean,
        autosize: [Boolean, Object],
        readonly: Boolean,
        required: Boolean,
        password: Boolean,
        iconClass: String,
        clearable: Boolean,
        clickable: Boolean,
        inputAlign: String,
        placeholder: String,
        customStyle: String,
        confirmType: String,
        confirmHold: Boolean,
        holdKeyboard: Boolean,
        errorMessage: String,
        arrowDirection: String,
        showWordLimit: Boolean,
        placeholderStyle: String,
        errorMessageAlign: String,
        selectionEnd: {
            type: Number,
            value: -1
        },
        selectionStart: {
            type: Number,
            value: -1
        },
        showConfirmBar: {
            type: Boolean,
            value: true
        },
        adjustPosition: {
            type: Boolean,
            value: true
        },
        cursorSpacing: {
            type: Number,
            value: 50
        },
        maxlength: {
            type: Number,
            value: -1
        },
        type: {
            type: String,
            value: 'text'
        },
        border: {
            type: Boolean,
            value: true
        },
        titleWidth: {
            type: String,
            value: '90px'
        }
    },
    data: {
        focused: false,
    },
    methods: {
        onInput(event) {
            const { value = '' } = event.detail || {};
            this.setData({ value });
            wx.nextTick(() => {
                this.emitChange(value);
            });
        },
        onFocus(event) {
            this.setData({ focused: true });
            this.$emit('focus', event.detail);
        },
        onBlur(event) {
            this.setData({ focused: false });
            this.$emit('blur', event.detail);
        },
        onClickIcon() {
            this.$emit('click-icon');
        },
        onClear() {
            this.setData({ value: '' });
            wx.nextTick(() => {
                this.emitChange('');
                this.$emit('clear', '');
            });
        },
        onConfirm() {
            this.$emit('confirm', this.data.value);
        },
        emitChange(value) {
            this.$emit('input', value);
            this.$emit('change', value);
        },
        noop() { }
    }
});
