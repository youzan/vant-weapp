'use strict';

Component({
  externalClasses: ['custom-class', 'cancel-class'],

  options: {
    multipleSlots: true
  },

  properties: {
    disabled: Boolean,
    readonly: Boolean,
    showAction: Boolean,
    useActionSlot: Boolean,
    placeholder: String,
    value: {
      type: String,
      observer: function observer(currentValue) {
        this.setData({ currentValue: currentValue });
      }
    },
    background: {
      type: String,
      value: '#f2f2f2'
    },
    maxlength: {
      type: Number,
      value: -1
    }
  },

  attached: function attached() {
    this.setData({ currentValue: this.data.value });
  },


  methods: {
    onChange: function onChange(event) {
      this.triggerEvent('change', event.detail);
    },
    onCancel: function onCancel() {
      this.setData({ currentValue: '' });
      this.triggerEvent('cancel');
      this.triggerEvent('change', '');
    },
    onSearch: function onSearch() {
      this.triggerEvent('search', this.data.currentValue);
    },
    onFocus: function onFocus() {
      this.triggerEvent('focus');
    },
    onBlur: function onBlur() {
      this.triggerEvent('blur');
    }
  }
});