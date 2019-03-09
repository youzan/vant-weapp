declare type ToastMessage = string | number;
export declare type ToastOptions = {
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
};
export interface Toast {
    (message: ToastOptions | ToastMessage, options?: ToastOptions): Weapp.Component;
    loading?(options?: ToastOptions | ToastMessage): Weapp.Component;
    success?(options?: ToastOptions | ToastMessage): Weapp.Component;
    fail?(options?: ToastOptions | ToastMessage): Weapp.Component;
    clear?(): void;
    setDefaultOptions?(options: ToastOptions): void;
    resetDefaultOptions?(): void;
}
declare const Toast: Toast;
export default Toast;
