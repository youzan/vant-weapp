import { VantComponent } from '../common/component';
VantComponent({
    relation: {
        type: 'descendant',
        name: 'goods-action-button',
        current: 'goods-action',
    },
    props: {
        safeAreaInsetBottom: {
            type: Boolean,
            value: true
        }
    }
});
