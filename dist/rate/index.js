import { VantComponent } from '../common/component';
VantComponent({
    field: true,
    classes: ['icon-class'],
    props: {
        value: {
            type: Number,
            observer(value) {
                if (value !== this.data.innerValue) {
                    this.setData({ innerValue: value });
                }
            }
        },
        readonly: Boolean,
        disabled: Boolean,
        allowHalf: Boolean,
        size: null,
        icon: {
            type: String,
            value: 'star'
        },
        voidIcon: {
            type: String,
            value: 'star-o'
        },
        color: {
            type: String,
            value: '#ffd21e'
        },
        voidColor: {
            type: String,
            value: '#c7c7c7'
        },
        disabledColor: {
            type: String,
            value: '#bdbdbd'
        },
        count: {
            type: Number,
            value: 5
        },
        gutter: null,
        touchable: {
            type: Boolean,
            value: true
        }
    },
    data: {
        innerValue: 0
    },
    methods: {
        onSelect(event) {
            const { data } = this;
            const { score } = event.currentTarget.dataset;
            if (!data.disabled && !data.readonly) {
                this.setData({ innerValue: score + 1 });
                this.$emit('input', score + 1);
                this.$emit('change', score + 1);
            }
        },
        onTouchMove(event) {
            const { touchable } = this.data;
            if (!touchable)
                return;
            const { clientX } = event.touches[0];
            this.getRect('.van-rate__icon', true).then((list) => {
                const target = list
                    .sort(item => item.right - item.left)
                    .find(item => clientX >= item.left && clientX <= item.right);
                if (target != null) {
                    this.onSelect(Object.assign(Object.assign({}, event), { currentTarget: target }));
                }
            });
        }
    }
});
