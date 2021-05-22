'use strict';
var __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
      to[j] = from[i];
    return to;
  };
Object.defineProperty(exports, '__esModule', { value: true });
var component_1 = require('../../../common/component');
component_1.VantComponent({
  props: {
    title: {
      type: String,
      value: '日期选择',
    },
    subtitle: String,
    showTitle: Boolean,
    showSubtitle: Boolean,
    firstDayOfWeek: {
      type: Number,
      observer: 'initWeekDay',
    },
  },
  data: {
    weekdays: [],
  },
  created: function () {
    this.initWeekDay();
  },
  methods: {
    initWeekDay: function () {
      var defaultWeeks = ['日', '一', '二', '三', '四', '五', '六'];
      var firstDayOfWeek = this.data.firstDayOfWeek || 0;
      this.setData({
        weekdays: __spreadArray(
          __spreadArray([], defaultWeeks.slice(firstDayOfWeek, 7)),
          defaultWeeks.slice(0, firstDayOfWeek)
        ),
      });
    },
  },
});
