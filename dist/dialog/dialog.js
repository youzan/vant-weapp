let queue = [];
const Dialog = options => {
    return new Promise((resolve, reject) => {
        const pages = getCurrentPages();
        const ctx = pages[pages.length - 1];
        const dialog = ctx.selectComponent(options.selector);
        delete options.selector;
        if (dialog) {
            dialog.setData(Object.assign({ onCancel: reject, onConfirm: resolve }, options));
            queue.push(dialog);
        }
    });
};
Dialog.defaultOptions = {
    show: true,
    title: '',
    message: '',
    zIndex: 100,
    overlay: true,
    asyncClose: false,
    selector: '#van-dialog',
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    showConfirmButton: true,
    showCancelButton: false,
    closeOnClickOverlay: false,
    confirmButtonOpenType: ''
};
Dialog.alert = options => Dialog(Object.assign({}, Dialog.currentOptions, options));
Dialog.confirm = options => Dialog(Object.assign({}, Dialog.currentOptions, { showCancelButton: true }, options));
Dialog.close = () => {
    queue.forEach(dialog => {
        dialog.close();
    });
    queue = [];
};
Dialog.setDefaultOptions = options => {
    Object.assign(Dialog.currentOptions, options);
};
Dialog.resetDefaultOptions = () => {
    Dialog.currentOptions = Object.assign({}, Dialog.defaultOptions);
};
Dialog.resetDefaultOptions();
export default Dialog;
