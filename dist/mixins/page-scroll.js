import { getCurrentPage, isDef } from '../common/utils';
function onPageScroll(event) {
    const { vanPageScroller = [] } = getCurrentPage();
    vanPageScroller.forEach((scroller) => {
        if (typeof scroller === 'function') {
            // @ts-ignore
            scroller(event);
        }
    });
}
export const pageScrollMixin = (scroller) => Behavior({
    attached() {
        const page = getCurrentPage();
        if (!isDef(page)) {
            return;
        }
        if (Array.isArray(page.vanPageScroller)) {
            page.vanPageScroller.push(scroller.bind(this));
        }
        else {
            page.vanPageScroller =
                typeof page.onPageScroll === 'function'
                    ? [page.onPageScroll.bind(page), scroller.bind(this)]
                    : [scroller.bind(this)];
        }
        page.onPageScroll = onPageScroll;
    },
    detached() {
        var _a;
        const page = getCurrentPage();
        if (isDef(page)) {
            page.vanPageScroller =
                ((_a = page.vanPageScroller) === null || _a === void 0 ? void 0 : _a.filter((item) => item !== scroller)) || [];
        }
    },
});
