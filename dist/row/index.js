import { VantComponent } from '../common/component';
import { useChildren } from '../common/relation';
VantComponent({
    relation: useChildren('col', function (target) {
        const { gutter } = this.data;
        if (gutter) {
            target.setData({ gutter });
        }
    }),
    props: {
        gutter: {
            type: Number,
            observer: 'setGutter',
        },
    },
    methods: {
        setGutter() {
            this.children.forEach((col) => {
                col.setData(this.data);
            });
        },
    },
});
