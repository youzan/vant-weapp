import { VantComponent } from '../common/component';
VantComponent({
    field: true,
    classes: ['icon-class'],
    props: {
        readonly: Boolean,
        disabled: Boolean,
        size: {
            type: Number,
            value: 20
        },
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
        value: {
            type: Number,
            value: 0
        }
    },
    data: {
        innerValue: 0
    },
    watch: {
        value(value) {
            if (value !== this.data.innerValue) {
                this.set({ innerValue: value });
            }
        }
    },
    computed: {
        list() {
            const { count, innerValue } = this.data;
            return Array.from({ length: count }, (_, index) => index < innerValue);
        }
    },
    methods: {
        onSelect(event) {
            const { data } = this;
            const { index } = event.currentTarget.dataset;
            if (!data.disabled && !data.readonly) {
                this.set({ innerValue: index + 1 });
                this.$emit('input', index + 1);
                this.$emit('change', index + 1);
            }
        },
        onTouchMove(event) {
            const { clientX, clientY } = event.touches[0];
            this.getRect('.van-rate__item', true).then(list => {
                const target = list.find(item => clientX >= item.left &&
                    clientX <= item.right &&
                    clientY >= item.top &&
                    clientY <= item.bottom);
                if (target != null) {
                    this.onSelect(Object.assign({}, event, { currentTarget: target }));
                }
            });
        }
    }
});
