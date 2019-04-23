import { VantComponent } from '../common/component';
import { isNumber } from '../common/utils';
VantComponent({
    relation: {
        name: 'badge',
        type: 'descendant',
        linked(target) {
            this.badges.push(target);
            this.setActive();
        },
        unlinked(target) {
            this.badges = this.badges.filter(item => item !== target);
            this.setActive();
        }
    },
    props: {
        active: {
            type: Number,
            value: 0
        }
    },
    watch: {
        active: 'setActive'
    },
    beforeCreate() {
        this.badges = [];
        this.currentActive = -1;
    },
    methods: {
        setActive(badge) {
            let { active } = this.data;
            const { badges } = this;
            if (badge && !isNumber(badge)) {
                active = badges.indexOf(badge);
            }
            if (active === this.currentActive) {
                return;
            }
            if (this.currentActive !== -1 && badges[this.currentActive]) {
                this.$emit('change', active);
                badges[this.currentActive].setActive(false);
            }
            if (badges[active]) {
                badges[active].setActive(true);
                this.currentActive = active;
            }
        }
    }
});
