import { VantComponent } from '../common/component';
import { RED, BLUE, GREEN } from '../common/color';
const DEFAULT_COLOR = '#999';
const COLOR_MAP = {
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
        style() {
            const color = this.data.color || COLOR_MAP[this.data.type] || DEFAULT_COLOR;
            const key = this.data.plain ? 'color' : 'background-color';
            const style = { [key]: color };
            if (this.data.textColor) {
                style.color = this.data.textColor;
            }
            return Object.keys(style).map(key => `${key}: ${style[key]}`).join(';');
        }
    }
});
