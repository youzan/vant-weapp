import { VantComponent } from '../common/component';
VantComponent({
    relation: {
        name: 'collapse-item',
        type: 'descendant',
        linked(child) {
            this.set({
                items: [...this.data.items, child]
            }, () => {
                child.updateExpanded();
            });
        }
    },
    props: {
        value: null,
        accordion: Boolean,
        border: {
            type: Boolean,
            value: true
        }
    },
    data: {
        items: []
    },
    watch: {
        value() {
            this.data.items.forEach(child => {
                child.updateExpanded();
            });
        },
        accordion() {
            this.data.items.forEach(child => {
                child.updateExpanded();
            });
        }
    },
    methods: {
        switch(name, expanded) {
            const { accordion, value } = this.data;
            if (!accordion) {
                name = expanded
                    ? value.concat(name)
                    : value.filter(activeName => activeName !== name);
            }
            else {
                name = expanded ? name : '';
            }
            this.$emit('change', name);
            this.$emit('input', name);
        }
    }
});
