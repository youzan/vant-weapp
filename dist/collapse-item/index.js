import { VantComponent } from '../common/component';
VantComponent({
  classes: ['content-class'],
  relation: {
    name: 'collapse',
    type: 'ancestor',
    linked: function linked(parent) {
      this.parent = parent;
    }
  },
  props: {
    name: null,
    title: null,
    value: null,
    icon: String,
    label: String,
    disabled: Boolean,
    border: {
      type: Boolean,
      value: true
    },
    isLink: {
      type: Boolean,
      value: true
    }
  },
  data: {
    contentHeight: 0,
    expanded: false
  },
  methods: {
    updateExpanded: function updateExpanded() {
      if (!this.parent) {
        return null;
      }

      var _this$parent$data = this.parent.data,
          value = _this$parent$data.value,
          accordion = _this$parent$data.accordion,
          items = _this$parent$data.items;
      var name = this.data.name;
      var index = items.indexOf(this);
      var currentName = name == null ? index : name;
      var expanded = accordion ? value === currentName : value.some(function (name) {
        return name === currentName;
      });

      if (expanded !== this.data.expanded) {
        this.updateStyle(expanded);
      }

      this.set({
        expanded: expanded
      });
    },
    updateStyle: function updateStyle(expanded) {
      if (expanded) {
        this.set({
          contentHeight: 'auto'
        });
      } else {
        this.set({
          contentHeight: 0
        });
      }
    },
    onClick: function onClick() {
      if (this.data.disabled) {
        return;
      }

      var _this$data = this.data,
          name = _this$data.name,
          expanded = _this$data.expanded;
      var index = this.parent.data.items.indexOf(this);
      var currentName = name == null ? index : name;
      this.parent.switch(currentName, !expanded);
    }
  }
});