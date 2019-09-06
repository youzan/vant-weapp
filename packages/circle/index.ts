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
      value: 0
    },
    size: {
      type: Number,
      value: 100
    },
    fill: {
      type: String,
      value: 'none'
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
  data: {
    progress: 0,
    startAngle: 0,
    endAngle: 0,
    currentValue: 0
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
      return this.data.position - this.data.strokeWidth / 2;
    },
    // 圆心位置
    position() {
      const { size } = this.data;
      return size / 2;
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
        context
      } = this.data;
      context.setLineWidth(strokeWidth); // 设置圆环的宽度
      context.setStrokeStyle(layerColor); // 设置圆环的颜色
      context.beginPath(); //开始一个新的路径
      context.arc(position, position, radius, 0, PERIMETER, !clockwise);
      //设置一个原点(100,100)，半径为90的圆的路径到当前路径
      context.stroke(); //对当前路径进行描边
    },
    renderHoverCircle() {
      const {
        radius,
        position,
        strokeWidth,
        clockwise,
        lineCap,
        context,
        hoverColor,
        value
      } = this.data;
      console.log(this.data);
      // 绘制轨道
      context.setStrokeStyle(hoverColor);
      context.setLineWidth(strokeWidth);
      context.setLineCap(lineCap);
      context.beginPath();
      // 初始角度
      const progress = PERIMETER * (format(value) / 100);
      // const progress =

      // 结束角度
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
    drawCircle(line = true) {
      const { context } = this.data;
      this.renderLayerCircle();
      if (line) {
        this.renderHoverCircle();
      }
      context.draw();
    },
    reRender() {
      // todo handle animate here
      let { value } = this.data;
      this.drawCircle(format(value) !== 0);
    }
  },
  created() {
    this.reRender();
  },
  destroyed() {}
});
