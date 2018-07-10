'use strict';

var _relations;

var CHECKBOX_GROUP_PATH = '../checkbox-group/index';

Component({
  externalClasses: ['checkbox-class'],
  relations: (_relations = {}, _relations[CHECKBOX_GROUP_PATH] = {
    type: 'parent'
  }, _relations),

  properties: {
    checked: Boolean,
    disabled: Boolean,
    isInGroup: Boolean,
    labelDisabled: Boolean,
    type: String
  },

  data: function data() {
    return {
      isInGroup: false,
      isInCell: false
    };
  },


  methods: {
    handleClick: function handleClick() {
      if (this.data.disabled) {
        return;
      }

      var checked = !this.data.checked;

      this.triggerEvent('change', checked);
      this.setData({ checked: checked });
    },
    updateData: function updateData(data) {
      this.setData(data);
    }
  }
});