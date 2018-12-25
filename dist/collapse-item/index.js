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
  beforeCreate: function beforeCreate() {
    this.animation = wx.createAnimation({
      duration: 300,
      timingFunction: 'ease-in-out'
    });
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
      var _this = this;

      this.getRect('.van-collapse-item__content').then(function (res) {
        var animationData = _this.animation.height(expanded ? res.height : 0).step().export();

        if (expanded) {
          _this.set({
            animationData: animationData
          });
        } else {
          _this.set({
            contentHeight: res.height + 'px'
          }, function () {
            setTimeout(function () {
              _this.set({
                animationData: animationData
              });
            }, 20);
          });
        }
      });
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
    },
    onTransitionEnd: function onTransitionEnd() {
      if (this.data.expanded) {
        this.set({
          contentHeight: 'auto'
        });
      }
    }
  }
});