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
            const { parent } = this;
            const { children = [] } = parent;
            const index = children.indexOf(this);
            const { length } = children;
            let isFirst = false;
            let isLast = false;
            if (index === 0) {
                isFirst = true;
            }
            if (index === length - 1) {
                isLast = true;
            }
            this.setData({
                isFirst,
                isLast
            });
        }
    }
});
