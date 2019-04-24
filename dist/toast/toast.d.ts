declare type ToastMessage = string | number;
interface ToastOptions {
    show?: boolean;
    type?: string;
    mask?: boolean;
    zIndex?: number;
    context?: any;
    position?: string;
    duration?: number;
    selector?: string;
    forbidClick?: boolean;
    loadingType?: string;
    message?: ToastMessage;
    onClose?: () => void;
}
declare function Toast(toastOptions: ToastOptions | ToastMessage): Weapp.Component;
declare namespace Toast {
    var loading: (options: string | number | ToastOptions) => Weapp.Component;
    var success: (options: string | number | ToastOptions) => Weapp.Component;
    var fail: (options: string | number | ToastOptions) => Weapp.Component;
    var clear: () => void;
    var setDefaultOptions: (options: ToastOptions) => void;
    var resetDefaultOptions: () => void;
}
export default Toast;
