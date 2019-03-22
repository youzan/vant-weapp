import { VantComponent } from '../common/component';
VantComponent({
    classes: ['title-class', 'content-class'],
    relation: {
        name: 'collapse',
        type: 'ancestor',
        linked(parent) {
            this.parent = parent;
        }
    },
    props: {
        name: null,
        title: null,
        value: null,
        icon: String,
        label: String,
        disabled: Boolean,
        border: {
            type: Boolean,
            value: true
        },
        isLink: {
            type: Boolean,
            value: true
        }
    },
    data: {
        contentHeight: 0,
        expanded: false
    },
    beforeCreate() {
        this.animation = wx.createAnimation({
            duration: 300,
            timingFunction: 'ease-in-out'
        });
    },
    methods: {
        updateExpanded() {
            if (!this.parent) {
                return null;
            }
            const { value, accordion, items } = this.parent.data;
            const { name } = this.data;
            const index = items.indexOf(this);
            const currentName = name == null ? index : name;
            const expanded = accordion
                ? value === currentName
                : value.some(name => name === currentName);
            if (expanded !== this.data.expanded) {
                this.updateStyle(expanded);
            }
            this.set({ index, expanded });
        },
        updateStyle(expanded) {
            this.getRect('.van-collapse-item__content').then(res => {
                const animationData = this.animation
                    .height(expanded ? res.height : 0)
                    .step()
                    .export();
                if (expanded) {
                    this.set({ animationData });
                }
                else {
                    this.set({
                        contentHeight: res.height + 'px'
                    }, () => {
                        setTimeout(() => {
                            this.set({ animationData });
                        }, 20);
                    });
                }
            });
        },
        onClick() {
            if (this.data.disabled) {
                return;
            }
            const { name, expanded } = this.data;
            const index = this.parent.data.items.indexOf(this);
            const currentName = name == null ? index : name;
            this.parent.switch(currentName, !expanded);
        },
        onTransitionEnd() {
            if (this.data.expanded) {
                this.set({
                    contentHeight: 'auto'
                });
            }
        }
    }
});
