import { VantComponent } from '../common/component';
VantComponent({
    relation: {
        type: 'ancestor',
        name: 'sidebar',
        linked(target) {
            this.parent = target;
        }
    },
    props: {
        dot: Boolean,
        info: null,
        title: String
    },
    methods: {
        onClick() {
            const { parent } = this;
            if (!parent) {
                return;
            }
            const index = parent.items.indexOf(this);
            parent.setActive(index).then(() => {
                this.$emit('click', index);
                parent.$emit('change', index);
            });
        },
        setActive(active) {
            return this.setData({ active });
        }
    }
});
