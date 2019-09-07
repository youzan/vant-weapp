import { VantComponent } from '../common/component';
import { isObj } from '../common/utils';
import { BLUE, WHITE } from '../common/color';

function format(rate) {
  return Math.min(Math.max(rate, 0), 100);
}
const PERIMETER = 2 * Math.PI;
const BEGIN_ANGLE = -Math.PI / 2;

VantComponent({
  props: {
    text: String,
    lineCap: {
      type: String,
      value: 'round'
    },
    value: {
      type: Number,
      value: 0,
      observer: 'reRender'
    },
    speed: {
      type: Number,
      value: 50
    },
    size: {
      type: Number,
      value: 100
    },
    fill: {
      type: String,
      value: ''
    },
    layerColor: {
      type: String,
      value: WHITE
    },
    color: {
      type: [String, Object],
      value: BLUE
    },
    strokeWidth: {
      type: Number,
      value: 4
    },
    clockwise: {
      type: Boolean,
      value: true
    }
  },

  computed: {
    context() {
      return this.ctx || (this.ctx = wx.createCanvasContext('vanCircle', this));
    },

    gradient() {
      return isObj(this.data.color);
    },

    hoverColor() {
      const { color, gradient, context, size } = this.data;

      if (gradient) {
        const LinearColor = context.createLinearGradient(size, 0, 0, 0);
        Object.keys(color)
          .sort((a, b) => parseFloat(a) - parseFloat(b))
          .map(key => {
            LinearColor.addColorStop(parseFloat(key) / 100, color[key]);
          });
        return LinearColor;
      }

      return color;
    },

    // 半径
    radius() {
      const { position, strokeWidth } = this.data;
      return position - strokeWidth / 2;
    },

    // 圆心位置
    position() {
      return this.data.size / 2;
    },

    style() {
      const { size } = this.data;
      return [`width: ${size}px`, `height: ${size}px`].join('; ');
    }
  },

  methods: {
    renderLayerCircle() {
      const {
        radius,
        position,
        clockwise,
        layerColor,
        strokeWidth,
        fill,
        context
      } = this.data;

      context.setLineWidth(strokeWidth);
      context.setStrokeStyle(layerColor);
      context.beginPath();
      context.arc(position, position, radius, 0, PERIMETER, !clockwise);
      context.stroke();

      if (fill) {
        context.setFillStyle(fill);
        context.fill();
      }
    },

    renderHoverCircle(formatValue) {
      const {
        radius,
        position,
        strokeWidth,
        clockwise,
        lineCap,
        context,
        hoverColor
      } = this.data;

      context.setStrokeStyle(hoverColor);
      context.setLineWidth(strokeWidth);
      context.setLineCap(lineCap);
      context.beginPath();

      // 结束角度
      const progress = PERIMETER * (formatValue / 100);
      const endAngle = clockwise
        ? BEGIN_ANGLE + progress
        : 3 * Math.PI - (BEGIN_ANGLE + progress);

      context.arc(
        position,
        position,
        radius,
        BEGIN_ANGLE,
        endAngle,
        !clockwise
      );
      context.stroke();
    },

    drawCircle(currentValue) {
      const { context, size } = this.data;
      context.clearRect(0, 0, size, size);
      this.renderLayerCircle();
      const formatValue = format(currentValue);

      if (formatValue !== 0) {
        this.renderHoverCircle(formatValue);
      }

      context.draw();
    },

    reRender() {
      // tofector 动画暂时没有想到好的解决方案
      const { value, speed } = this.data;

      if (speed <= 0 || speed > 1000) {
        this.drawCircle(value);
        return;
      }

      clearInterval(this.interval);
      this.currentValue = this.currentValue || 0;
      this.interval = setInterval(() => {
        if (this.currentValue !== value) {
          if (this.currentValue < value) {
            this.currentValue += 1;
          } else {
            this.currentValue -= 1;
          }
          this.drawCircle(this.currentValue);
        } else {
          clearInterval(this.interval);
        }
      }, 1000 / speed);
    }
  },

  created() {
    this.currentValue = this.data.value;
    this.drawCircle(this.currentValue);
  },

  destroyed() {
    clearInterval(this.interval);
  }
});
