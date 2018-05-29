'use strict';

Component({
  externalClasses: ['mask-class', 'container-class'],
  properties: {
    actions: {
      type: Array,
      value: []
    },
    show: {
      type: Boolean,
      value: false
    },
    cancelWithMask: {
      type: Boolean,
      value: true
    },
    cancelText: {
      type: String,
      value: ''
    }
  },
  methods: {
    onMaskClick: function onMaskClick() {
      if (this.data.cancelWithMask) {
        this.cancelClick();
      }
    },
    cancelClick: function cancelClick() {
      this.triggerEvent('cancel');
    },
    handleBtnClick: function handleBtnClick(_ref) {
      var _ref$currentTarget = _ref.currentTarget,
          currentTarget = _ref$currentTarget === undefined ? {} : _ref$currentTarget;

      var dataset = currentTarget.dataset || {};
      var index = dataset.index;

      this.triggerEvent('actionclick', { index: index });
    }
  }
});