import { VantComponent } from '../common/component';
VantComponent({
  field: true,
  classes: ['input-class'],
  props: {
    icon: String,
    label: String,
    error: Boolean,
    fixed: Boolean,
    focus: Boolean,
    center: Boolean,
    isLink: Boolean,
    leftIcon: String,
    disabled: Boolean,
    autosize: Boolean,
    readonly: Boolean,
    required: Boolean,
    iconClass: String,
    clearable: Boolean,
    inputAlign: String,
    customClass: String,
    confirmType: String,
    confirmHold: Boolean,
    errorMessage: String,
    placeholder: String,
    customStyle: String,
    useIconSlot: Boolean,
    useButtonSlot: Boolean,
    showConfirmBar: {
      type: Boolean,
      value: true
    },
    placeholderStyle: String,
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
  beforeCreate: function beforeCreate() {
    this.focused = false;
  },
  methods: {
    onInput: function onInput(event) {
      var _this = this;

      var _ref = event.detail || {},
          _ref$value = _ref.value,
          value = _ref$value === void 0 ? '' : _ref$value;

      this.set({
        value: value,
        showClear: this.getShowClear(value)
      }, function () {
        _this.$emit('input', value);

        _this.$emit('change', value);
      });
    },
    onFocus: function onFocus(event) {
      var _ref2 = event.detail || {},
          _ref2$value = _ref2.value,
          value = _ref2$value === void 0 ? '' : _ref2$value,
          _ref2$height = _ref2.height,
          height = _ref2$height === void 0 ? 0 : _ref2$height;

      this.$emit('focus', {
        value: value,
        height: height
      });
      this.focused = true;
      this.set({
        showClear: this.getShowClear()
      });
    },
    onBlur: function onBlur(event) {
      var _ref3 = event.detail || {},
          _ref3$value = _ref3.value,
          value = _ref3$value === void 0 ? '' : _ref3$value,
          _ref3$cursor = _ref3.cursor,
          cursor = _ref3$cursor === void 0 ? 0 : _ref3$cursor;

      this.$emit('blur', {
        value: value,
        cursor: cursor
      });
      this.focused = false;
      this.set({
        showClear: this.getShowClear()
      });
    },
    onClickIcon: function onClickIcon() {
      this.$emit('click-icon');
    },
    getShowClear: function getShowClear(value) {
      value = value === undefined ? this.data.value : value;
      return this.data.clearable && this.focused && value && !this.data.readonly;
    },
    onClear: function onClear() {
      var _this2 = this;

      this.set({
        value: '',
        showClear: this.getShowClear('')
      }, function () {
        _this2.$emit('input', '');

        _this2.$emit('change', '');

        _this2.$emit('clear', '');
      });
    },
    onConfirm: function onConfirm() {
      this.$emit('confirm', this.data.value);
    }
  }
});