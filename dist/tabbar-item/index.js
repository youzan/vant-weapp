import { VantComponent } from '../common/component';
VantComponent({
    props: {
        info: null,
        icon: String,
        dot: Boolean
    },
    relation: {
        name: 'tabbar',
        type: 'ancestor'
    },
    data: {
        active: false
    },
    methods: {
        onClick() {
            const parent = this.getRelationNodes('../tabbar/index')[0];
            if (parent) {
                parent.onChange(this);
            }
            this.$emit('click');
        },
        setActive({ active, color }) {
            if (this.data.active !== active) {
                this.set({ active, color });
            }
        }
    }
});
