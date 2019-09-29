import { VantComponent } from '../common/component';
VantComponent({
    relation: {
        name: 'sidebar-item',
        type: 'descendant',
        linked(target) {
            this.items.push(target);
            this.setActive(this.data.active);
        },
        unlinked(target) {
            this.items = this.items.filter(item => item !== target);
            this.setActive(this.data.active);
        }
    },
    props: {
        active: {
            type: Number,
            value: 0,
            observer: 'setActive'
        }
    },
    beforeCreate() {
        this.items = [];
        this.currentActive = -1;
    },
    methods: {
        setActive(active) {
            const { items, currentActive } = this;
            if (!items.length) {
                return Promise.resolve();
            }
            this.currentActive = active;
            const stack = [];
            if (currentActive !== active && items[currentActive]) {
                stack.push(items[currentActive].setActive(false));
            }
            if (items[active]) {
                stack.push(items[active].setActive(true));
            }
            return Promise.all(stack);
        }
    }
});
