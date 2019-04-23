import { VantComponent } from '../common/component';
VantComponent({
    relation: {
        type: 'ancestor',
        name: 'badge-group'
    },
    props: {
        info: null,
        title: String
    },
    methods: {
        onClick() {
            const group = this.getRelationNodes('../badge-group/index')[0];
            if (group) {
                group.setActive(this);
            }
        },
        setActive(active) {
            this.set({ active });
        }
    }
});
