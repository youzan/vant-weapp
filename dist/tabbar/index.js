import { VantComponent } from '../common/component';
import { safeArea } from '../mixins/safe-area';
VantComponent({
    mixins: [safeArea()],
    relation: {
        name: 'tabbar-item',
        type: 'descendant',
        linked(target) {
            this.children = this.children || [];
            this.children.push(target);
            this.setActiveItem();
        },
        unlinked(target) {
            this.children = this.children || [];
            this.children = this.children.filter(item => item !== target);
            this.setActiveItem();
        }
    },
    props: {
        active: Number,
        activeColor: String,
        fixed: {
            type: Boolean,
            value: true
        },
        zIndex: {
            type: Number,
            value: 1
        }
    },
    watch: {
        active(active) {
            this.currentActive = active;
            this.setActiveItem();
        }
    },
    created() {
        this.currentActive = this.data.active;
    },
    methods: {
        setActiveItem() {
            if (!Array.isArray(this.children) || !this.children.length) {
                return Promise.resolve();
            }
            return Promise.all(this.children.map((item, index) => item.setActive({
                active: index === this.currentActive,
                color: this.data.activeColor
            })));
        },
        onChange(child) {
            const active = (this.children || []).indexOf(child);
            if (active !== this.currentActive && active !== -1) {
                this.currentActive = active;
                this.setActiveItem().then(() => {
                    this.$emit('change', active);
                });
            }
        }
    }
});
