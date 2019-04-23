import { VantComponent } from '../common/component';
VantComponent({
    props: {
        info: null,
        icon: String,
        dot: Boolean
    },
    relation: {
        name: 'tabbar',
        type: 'ancestor',
        linked(target) {
            this.parent = target;
        }
    },
    data: {
        active: false
    },
    methods: {
        onClick() {
            if (this.parent) {
                this.parent.onChange(this);
            }
            this.$emit('click');
        },
        setActive({ active, color }) {
            if (this.data.active !== active) {
                return this.set({ active, color });
            }
            return Promise.resolve();
        }
    }
});
