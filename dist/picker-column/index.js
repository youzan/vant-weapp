import { VantComponent } from '../common/component';
import { isObj, range } from '../common/utils';
var DEFAULT_DURATION = 200;
VantComponent({
  classes: ['active-class'],
  props: {
    valueKey: String,
    className: String,
    itemHeight: Number,
    visibleItemCount: Number,
    initialOptions: {
      type: Array,
      value: []
    },
    defaultIndex: {
      type: Number,
      value: 0
    }
  },
  data: {
    startY: 0,
    offset: 0,
    duration: 0,
    startOffset: 0,
    options: [],
    currentIndex: 0
  },
  created: function created() {
    var _this = this;

    var _this$data = this.data,
        defaultIndex = _this$data.defaultIndex,
        initialOptions = _this$data.initialOptions;
    this.set({
      currentIndex: defaultIndex,
      options: initialOptions
    }, function () {
      _this.setIndex(defaultIndex);
    });
  },
  computed: {
    count: function count() {
      return this.data.options.length;
    },
    baseOffset: function baseOffset() {
      var data = this.data;
      return data.itemHeight * (data.visibleItemCount - 1) / 2;
    },
    wrapperStyle: function wrapperStyle() {
      var data = this.data;
      return ["transition: " + data.duration + "ms", "transform: translate3d(0, " + (data.offset + data.baseOffset) + "px, 0)", "line-height: " + data.itemHeight + "px"].join('; ');
    }
  },
  watch: {
    defaultIndex: function defaultIndex(value) {
      this.setIndex(value);
    }
  },
  methods: {
    onTouchStart: function onTouchStart(event) {
      this.set({
        startY: event.touches[0].clientY,
        startOffset: this.data.offset,
        duration: 0
      });
    },
    onTouchMove: function onTouchMove(event) {
      var data = this.data;
      var deltaY = event.touches[0].clientY - data.startY;
      this.set({
        offset: range(data.startOffset + deltaY, -(data.count * data.itemHeight), data.itemHeight)
      });
    },
    onTouchEnd: function onTouchEnd() {
      var data = this.data;

      if (data.offset !== data.startOffset) {
        this.set({
          duration: DEFAULT_DURATION
        });
        var index = range(Math.round(-data.offset / data.itemHeight), 0, data.count - 1);
        this.setIndex(index, true);
      }
    },
    onClickItem: function onClickItem(event) {
      var index = event.currentTarget.dataset.index;
      this.setIndex(index, true);
    },
    adjustIndex: function adjustIndex(index) {
      var data = this.data;
      index = range(index, 0, data.count);

      for (var i = index; i < data.count; i++) {
        if (!this.isDisabled(data.options[i])) return i;
      }

      for (var _i = index - 1; _i >= 0; _i--) {
        if (!this.isDisabled(data.options[_i])) return _i;
      }
    },
    isDisabled: function isDisabled(option) {
      return isObj(option) && option.disabled;
    },
    getOptionText: function getOptionText(option) {
      var data = this.data;
      return isObj(option) && data.valueKey in option ? option[data.valueKey] : option;
    },
    setIndex: function setIndex(index, userAction) {
      var _this2 = this;

      var data = this.data;
      index = this.adjustIndex(index) || 0;
      var offset = -index * data.itemHeight;

      if (index !== data.currentIndex) {
        return this.set({
          offset: offset,
          currentIndex: index
        }).then(function () {
          userAction && _this2.$emit('change', index);
        });
      } else {
        return this.set({
          offset: offset
        });
      }
    },
    setValue: function setValue(value) {
      var options = this.data.options;

      for (var i = 0; i < options.length; i++) {
        if (this.getOptionText(options[i]) === value) {
          return this.setIndex(i);
        }
      }

      return Promise.resolve();
    },
    getValue: function getValue() {
      var data = this.data;
      return data.options[data.currentIndex];
    }
  }
});