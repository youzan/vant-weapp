const CHECKBOX_GROUP_PATH = '../checkbox-group/index';

Component({
  externalClasses: ['checkbox-class'],
  relations: {
    [CHECKBOX_GROUP_PATH]: {
      type: 'parent'
    }
  },

  properties: {
    checked: Boolean,
    disabled: Boolean,
    isInGroup: Boolean,
    labelDisabled: Boolean,
    type: String
  },

  data() {
    return {
      isInGroup: false,
      isInCell: false
    }
  },

  methods: {
    handleClick() {
      if (this.data.disabled) {
        return;
      }

      const checked = !this.data.checked;

      this.triggerEvent('change', checked)
      this.setData({ checked })
    },

    updateData(data) {
      this.setData(data);
    }
  }
});
