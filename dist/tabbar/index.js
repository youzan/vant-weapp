import { VantComponent } from '../common/component';
import { useChildren } from '../common/relation';
import { getRect } from '../common/utils';
VantComponent({
    relation: useChildren('tabbar-item', function () {
        this.updateChildren();
    }),
    props: {
        active: {
            type: null,
            observer: 'updateChildren',
        },
        activeColor: {
            type: String,
            observer: 'updateChildren',
        },
        inactiveColor: {
            type: String,
            observer: 'updateChildren',
        },
        fixed: {
            type: Boolean,
            value: true,
            observer: 'setHeight',
        },
        placeholder: {
            type: Boolean,
            observer: 'setHeight',
        },
        border: {
            type: Boolean,
            value: true,
        },
        zIndex: {
            type: Number,
            value: 1,
        },
        safeAreaInsetBottom: {
            type: Boolean,
            value: true,
        },
    },
    data: {
        height: 50,
    },
    methods: {
        updateChildren() {
            const { children } = this;
            if (!Array.isArray(children) || !children.length) {
                return;
            }
            children.forEach((child) => child.updateFromParent());
        },
        setHeight() {
            if (!this.data.fixed || !this.data.placeholder) {
                return;
            }
            wx.nextTick(() => {
                getRect(this, '.van-tabbar').then((res) => {
                    this.setData({ height: res.height });
                });
            });
        },
    },
});
