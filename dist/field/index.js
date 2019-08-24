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
        autosize: Boolean,
        readonly: Boolean,
        required: Boolean,
        password: Boolean,
        iconClass: String,
        clearable: Boolean,
        inputAlign: String,
        customStyle: String,
        confirmType: String,
        confirmHold: Boolean,
        errorMessage: String,
        placeholder: String,
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
        showClear: false
    },
    beforeCreate() {
        this.focused = false;
    },
    methods: {
        onInput(event) {
            const { value = '' } = event.detail || {};
            this.set({
                value,
                showClear: this.getShowClear(value)
            }, () => {
                this.emitChange(value);
            });
        },
        onFocus(event) {
            const { value = '', height = 0 } = event.detail || {};
            this.$emit('focus', { value, height });
            this.focused = true;
            this.blurFromClear = false;
            this.set({
                showClear: this.getShowClear()
            });
        },
        onBlur(event) {
            const { value = '', cursor = 0 } = event.detail || {};
            this.$emit('blur', { value, cursor });
            this.focused = false;
            const showClear = this.getShowClear();
            if (this.data.value === value) {
                this.set({
                    showClear
                });
            }
            else if (!this.blurFromClear) {
                // fix: the handwritten keyboard does not trigger input change
                this.set({
                    value,
                    showClear
                }, () => {
                    this.emitChange(value);
                });
            }
        },
        onClickIcon() {
            this.$emit('click-icon');
        },
        getShowClear(value) {
            value = value === undefined ? this.data.value : value;
            return (this.data.clearable && this.focused && value && !this.data.readonly);
        },
        onClear() {
            this.blurFromClear = true;
            this.set({
                value: '',
                showClear: this.getShowClear('')
            }, () => {
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
        }
    }
});
