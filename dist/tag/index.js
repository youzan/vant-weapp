import { VantComponent } from '../common/component';
import { RED, BLUE, GREEN } from '../common/color';
var DEFAULT_COLOR = '#999';
var COLOR_MAP = {
  danger: RED,
  primary: BLUE,
  success: GREEN
};
VantComponent({
  props: {
    size: String,
    type: String,
    mark: Boolean,
    color: String,
    plain: Boolean,
    round: Boolean,
    textColor: String
  },
  computed: {
    style: function style() {
      var color = this.data.color || COLOR_MAP[this.data.type] || DEFAULT_COLOR;
      var key = this.data.plain ? 'color' : 'background-color';
      var style = {
        [key]: color
      };

      if (this.data.textColor) {
        style.color = this.data.textColor;
      }

      return Object.keys(style).map(function (key) {
        return key + ": " + style[key];
      }).join(';');
    }
  }
});