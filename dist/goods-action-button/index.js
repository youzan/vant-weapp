import { VantComponent } from '../common/component';
import { link } from '../mixins/link';
import { button } from '../mixins/button';
import { openType } from '../mixins/open-type';
VantComponent({
    mixins: [link, button, openType],
    relation: {
        type: 'ancestor',
        name: 'goods-action',
        linked(parent) {
            this.parent = parent;
        }
    },
    props: {
        text: String,
        color: String,
        loading: Boolean,
        disabled: Boolean,
        plain: Boolean,
        type: {
            type: String,
            value: 'danger'
        }
    },
    mounted() {
        this.updateStyle();
    },
    methods: {
        onClick(event) {
            this.$emit('click', event.detail);
            this.jumpLink();
        },
        updateStyle() {
            const { children = [] } = this.parent;
            const { length } = children;
            const index = children.indexOf(this);
            let rightBorderLess = false;
            if (length > 1) {
                rightBorderLess = index !== length - 1;
            }
            this.setData({
                isFirst: index === 0,
                rightBorderLess,
                isLast: index === length - 1
            });
        }
    }
});
