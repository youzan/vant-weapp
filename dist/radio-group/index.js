import { VantComponent } from '../common/component';
VantComponent({
    field: true,
    relation: {
        name: 'radio',
        type: 'descendant',
        linked(target) {
            const { value, disabled } = this.data;
            target.set({
                value: value,
                disabled: disabled || target.data.disabled
            });
        }
    },
    props: {
        value: null,
        disabled: Boolean
    },
    watch: {
        value(value) {
            const children = this.getRelationNodes('../radio/index');
            children.forEach(child => {
                child.set({ value });
            });
        },
        disabled(disabled) {
            const children = this.getRelationNodes('../radio/index');
            children.forEach(child => {
                child.set({ disabled: disabled || child.data.disabled });
            });
        }
    }
});
