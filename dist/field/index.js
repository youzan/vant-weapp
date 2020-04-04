import { VantComponent } from '../common/component';
import { commonProps, inputProps, textareaProps } from './props';
VantComponent({
    field: true,
    classes: ['input-class', 'right-icon-class'],
    props: Object.assign(Object.assign(Object.assign(Object.assign({}, commonProps), inputProps), textareaProps), { size: String, icon: String, label: String, error: Boolean, center: Boolean, isLink: Boolean, leftIcon: String, rightIcon: String, autosize: [Boolean, Object], readonly: {
            type: Boolean,
            observer: 'setShowClear'
        }, required: Boolean, iconClass: String, clearable: {
            type: Boolean,
            observer: 'setShowClear'
        }, clickable: Boolean, inputAlign: String, customStyle: String, errorMessage: String, arrowDirection: String, showWordLimit: Boolean, errorMessageAlign: String, border: {
            type: Boolean,
            value: true
        }, titleWidth: {
            type: String,
            value: '90px'
        } }),
    data: {
        focused: false,
        innerValue: '',
        showClear: false
    },
    created() {
        this.value = this.data.value;
        this.setData({ innerValue: this.value });
    },
    methods: {
        onInput(event) {
            const { value = '' } = event.detail || {};
            this.value = value;
            this.setShowClear();
            this.emitChange();
        },
        onFocus(event) {
            this.focused = true;
            this.setShowClear();
            this.$emit('focus', event.detail);
        },
        onBlur(event) {
            this.focused = false;
            this.setShowClear();
            this.$emit('blur', event.detail);
        },
        onClickIcon() {
            this.$emit('click-icon');
        },
        onClear() {
            this.setData({ innerValue: '' });
            this.value = '';
            this.setShowClear();
            wx.nextTick(() => {
                this.emitChange();
                this.$emit('clear', '');
            });
        },
        onConfirm(event) {
            const { value = '' } = event.detail || {};
            this.value = value;
            this.setShowClear();
            this.$emit('confirm', value);
        },
        setValue(value) {
            this.value = value;
            this.setShowClear();
            if (value === '') {
                this.setData({ innerValue: '' });
            }
            this.emitChange();
        },
        onLineChange(event) {
            this.$emit('linechange', event.detail);
        },
        onKeyboardHeightChange(event) {
            this.$emit('keyboardheightchange', event.detail);
        },
        emitChange() {
            this.$emit('input', this.value);
            this.$emit('change', this.value);
        },
        setShowClear() {
            const { clearable, readonly } = this.data;
            const { focused, value } = this;
            this.setData({
                showClear: clearable && focused && !!value && !readonly
            });
        },
        noop() { }
    }
});
