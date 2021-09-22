import { VantComponent } from '../common/component';
import { useChildren } from '../common/relation';
VantComponent({
    relation: useChildren('goods-action-button', function () {
        this.children.forEach((item) => {
            item.updateStyle();
        });
    }),
    props: {
        safeAreaInsetBottom: {
            type: Boolean,
            value: true,
        },
    },
});
