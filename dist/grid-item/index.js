import { link } from '../mixins/link';
import { VantComponent } from '../common/component';
VantComponent({
    relation: {
        name: 'grid',
        type: 'ancestor',
        linked(parent) {
            this.parent = parent;
        }
    },
    mixins: [link],
    props: {
        icon: String,
        text: String,
        useSlot: Boolean
    },
    mounted() {
        this.updateStyle();
    },
    methods: {
        updateStyle() {
            if (!this.parent) {
                return;
            }
            const { data, children } = this.parent;
            const { columnNum, border, square, gutter, clickable, center } = data;
            const width = `${100 / columnNum}%`;
            const styleWrapper = [];
            styleWrapper.push(`width: ${width}`);
            if (square) {
                styleWrapper.push(`padding-top: ${width}`);
            }
            if (gutter) {
                styleWrapper.push(`padding-right: ${gutter}px`);
                const index = children.indexOf(this);
                if (index >= columnNum) {
                    styleWrapper.push(`margin-top: ${gutter}px`);
                }
            }
            this.setData({
                style: styleWrapper.join('; '),
                center,
                border,
                square,
                gutter,
                clickable
            });
        },
        onClick() {
            this.$emit('click');
            this.jumpLink();
        }
    }
});
