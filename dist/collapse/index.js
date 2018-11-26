import { VantComponent } from '../common/component';
VantComponent({
  relation: {
    name: 'collapse-item',
    type: 'descendant',
    linked: function linked(child) {
      this.setData({
        items: this.data.items.concat([child])
      }, function () {
        child.updateExpanded();
      });
    }
  },
  props: {
    accordion: Boolean,
    value: null
  },
  data: {
    items: []
  },
  watch: {
    value: function value() {
      this.data.items.forEach(function (child) {
        child.updateExpanded();
      });
    },
    accordion: function accordion() {
      this.data.items.forEach(function (child) {
        child.updateExpanded();
      });
    }
  },
  methods: {
    switch: function _switch(name, expanded) {
      var _this$data = this.data,
          accordion = _this$data.accordion,
          value = _this$data.value;

      if (!accordion) {
        name = expanded ? value.concat(name) : value.filter(function (activeName) {
          return activeName !== name;
        });
      } else {
        name = expanded ? name : '';
      }

      this.$emit('change', name);
      this.$emit('input', name);
    }
  }
});