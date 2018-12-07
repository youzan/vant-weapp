function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { VantComponent } from '../common/component';
VantComponent({
  field: true,
  classes: ['icon-class'],
  props: {
    readonly: Boolean,
    disabled: Boolean,
    size: {
      type: Number,
      value: 20
    },
    icon: {
      type: String,
      value: 'star'
    },
    voidIcon: {
      type: String,
      value: 'star-o'
    },
    color: {
      type: String,
      value: '#ffd21e'
    },
    voidColor: {
      type: String,
      value: '#c7c7c7'
    },
    disabledColor: {
      type: String,
      value: '#bdbdbd'
    },
    count: {
      type: Number,
      value: 5
    },
    value: {
      type: Number,
      value: 0
    }
  },
  data: {
    innerValue: 0
  },
  watch: {
    value: function value(_value) {
      if (_value !== this.data.innerValue) {
        this.set({
          innerValue: _value
        });
      }
    }
  },
  computed: {
    list: function list() {
      var _this$data = this.data,
          count = _this$data.count,
          innerValue = _this$data.innerValue;
      return Array.from({
        length: count
      }, function (_, index) {
        return index < innerValue;
      });
    }
  },
  methods: {
    onSelect: function onSelect(event) {
      var data = this.data;
      var index = event.currentTarget.dataset.index;

      if (!data.disabled && !data.readonly) {
        this.set({
          innerValue: index + 1
        });
        this.$emit('input', index + 1);
        this.$emit('change', index + 1);
      }
    },
    onTouchMove: function onTouchMove(event) {
      var _this = this;

      var _event$touches$ = event.touches[0],
          clientX = _event$touches$.clientX,
          clientY = _event$touches$.clientY;
      this.getRect('.van-rate__item', true).then(function (list) {
        var target = list.find(function (item) {
          return clientX >= item.left && clientX <= item.right && clientY >= item.top && clientY <= item.bottom;
        });

        if (target != null) {
          _this.onSelect(_extends({}, event, {
            currentTarget: target
          }));
        }
      });
    }
  }
});