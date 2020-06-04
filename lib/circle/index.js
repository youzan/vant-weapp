'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var component_1 = require('../common/component');
var utils_1 = require('../common/utils');
var color_1 = require('../common/color');
var canvas_1 = require('./canvas');
function format(rate) {
  return Math.min(Math.max(rate, 0), 100);
}
var PERIMETER = 2 * Math.PI;
var BEGIN_ANGLE = -Math.PI / 2;
var STEP = 1;
component_1.VantComponent({
  props: {
    text: String,
    lineCap: {
      type: String,
      value: 'round',
    },
    value: {
      type: Number,
      value: 0,
      observer: 'reRender',
    },
    speed: {
      type: Number,
      value: 50,
    },
    size: {
      type: Number,
      value: 100,
      observer: function () {
        this.drawCircle(this.currentValue);
      },
    },
    fill: String,
    layerColor: {
      type: String,
      value: color_1.WHITE,
    },
    color: {
      type: [String, Object],
      value: color_1.BLUE,
      observer: 'setHoverColor',
    },
    type: {
      type: String,
      value: '',
    },
    strokeWidth: {
      type: Number,
      value: 4,
    },
    clockwise: {
      type: Boolean,
      value: true,
    },
  },
  data: {
    hoverColor: color_1.BLUE,
  },
  methods: {
    getContext: function () {
      var _this = this;
      var type = this.data.type;
      if (type === '') {
        var ctx = wx.createCanvasContext('van-circle', this);
        return Promise.resolve(ctx);
      }
      var dpr = wx.getSystemInfoSync().pixelRatio;
      return new Promise(function (resolve) {
        wx.createSelectorQuery()
          .in(_this)
          .select('#van-circle')
          .fields({ node: true, size: true })
          .exec(function (res) {
            var canvas = res[0].node;
            var ctx = canvas.getContext(type);
            canvas.width = res[0].width * dpr;
            canvas.height = res[0].height * dpr;
            ctx.scale(dpr, dpr);
            resolve(canvas_1.adaptor(ctx));
          });
      });
    },
    setHoverColor: function () {
      var _this = this;
      var _a = this.data,
        color = _a.color,
        size = _a.size;
      var hoverColor = color;
      this.getContext().then(function (context) {
        if (utils_1.isObj(color)) {
          var LinearColor_1 = context.createLinearGradient(size, 0, 0, 0);
          Object.keys(color)
            .sort(function (a, b) {
              return parseFloat(a) - parseFloat(b);
            })
            .map(function (key) {
              return LinearColor_1.addColorStop(
                parseFloat(key) / 100,
                color[key]
              );
            });
          hoverColor = LinearColor_1;
        }
        _this.setData({ hoverColor: hoverColor });
      });
    },
    presetCanvas: function (context, strokeStyle, beginAngle, endAngle, fill) {
      var _a = this.data,
        strokeWidth = _a.strokeWidth,
        lineCap = _a.lineCap,
        clockwise = _a.clockwise,
        size = _a.size,
        type = _a.type;
      var position = size / 2;
      var radius = position - strokeWidth / 2;
      context.setStrokeStyle(strokeStyle);
      context.setLineWidth(strokeWidth);
      context.setLineCap(lineCap);
      context.beginPath();
      context.arc(position, position, radius, beginAngle, endAngle, !clockwise);
      context.stroke();
      if (fill) {
        context.setFillStyle(fill);
        context.fill();
      }
    },
    renderLayerCircle: function (context) {
      var _a = this.data,
        layerColor = _a.layerColor,
        fill = _a.fill;
      this.presetCanvas(context, layerColor, 0, PERIMETER, fill);
    },
    renderHoverCircle: function (context, formatValue) {
      var _a = this.data,
        clockwise = _a.clockwise,
        hoverColor = _a.hoverColor;
      // 结束角度
      var progress = PERIMETER * (formatValue / 100);
      var endAngle = clockwise
        ? BEGIN_ANGLE + progress
        : 3 * Math.PI - (BEGIN_ANGLE + progress);
      this.presetCanvas(context, hoverColor, BEGIN_ANGLE, endAngle);
    },
    drawCircle: function (currentValue) {
      var _this = this;
      var size = this.data.size;
      this.getContext().then(function (context) {
        context.clearRect(0, 0, size, size);
        _this.renderLayerCircle(context);
        var formatValue = format(currentValue);
        if (formatValue !== 0) {
          _this.renderHoverCircle(context, formatValue);
        }
        context.draw();
      });
    },
    reRender: function () {
      var _this = this;
      // tofector 动画暂时没有想到好的解决方案
      var _a = this.data,
        value = _a.value,
        speed = _a.speed;
      if (speed <= 0 || speed > 1000) {
        this.drawCircle(value);
        return;
      }
      this.clearInterval();
      this.currentValue = this.currentValue || 0;
      this.interval = setInterval(function () {
        if (_this.currentValue !== value) {
          if (_this.currentValue < value) {
            _this.currentValue += STEP;
          } else {
            _this.currentValue -= STEP;
          }
          _this.drawCircle(_this.currentValue);
        } else {
          _this.clearInterval();
        }
      }, 1000 / speed);
    },
    clearInterval: function () {
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
      }
    },
  },
  created: function () {
    var value = this.data.value;
    this.currentValue = value;
    this.drawCircle(value);
  },
  destroyed: function () {
    this.clearInterval();
  },
});
