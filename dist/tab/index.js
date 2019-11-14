import { VantComponent } from '../common/component';
VantComponent({
    relation: {
        name: 'tabs',
        type: 'ancestor',
        linked(target) {
            this.parent = target;
        },
        unlinked() {
            this.parent = null;
        }
    },
    props: {
        dot: Boolean,
        info: null,
        title: String,
        disabled: Boolean,
        titleStyle: String,
        name: {
            type: [Number, String],
            value: '',
        }
    },
    data: {
        width: null,
        inited: false,
        active: false,
        animated: false
    },
    watch: {
        title: 'update',
        disabled: 'update',
        dot: 'update',
        info: 'update',
        titleStyle: 'update'
    },
    methods: {
        setComputedName() {
            this.computedName = this.data.name || this.index;
        },
        getComputedName() {
            if (this.data.name !== '') {
                return this.data.name;
            }
            return this.index;
        },
        update() {
            if (this.parent) {
                this.parent.updateTabs();
            }
        }
    }
});
