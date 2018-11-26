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
    name: [String, Number],
    icon: String,
    label: String,
    title: [String, Number],
    value: [String, Number],
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
  computed: {
    titleClass: function titleClass() {
      var _this$data = this.data,
          disabled = _this$data.disabled,
          expanded = _this$data.expanded;
      return this.classNames('van-collapse-item__title', {
        'van-collapse-item__title--disabled': disabled,
        'van-collapse-item__title--expanded': expanded
      });
    }
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

      this.setData({
        expanded: expanded
      });
    },
    updateStyle: function updateStyle(expanded) {
      var _this = this;

      if (expanded) {
        this.getRect('.van-collapse-item__content').then(function (res) {
          _this.setData({
            contentHeight: res.height ? res.height + 'px' : null
          });
        });
      } else {
        this.setData({
          contentHeight: 0
        });
      }
    },
    onClick: function onClick() {
      if (this.data.disabled) {
        return;
      }

      var _this$data2 = this.data,
          name = _this$data2.name,
          expanded = _this$data2.expanded;
      var index = this.parent.data.items.indexOf(this);
      var currentName = name == null ? index : name;
      this.parent.switch(currentName, !expanded);
    }
  }
});