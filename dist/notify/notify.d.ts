interface NotifyOptions {
    type?: 'primary' | 'success' | 'danger' | 'warning';
    color?: string;
    zIndex?: number;
    message: string;
    context?: any;
    duration?: number;
    selector?: string;
    background?: string;
    safeAreaInsetTop?: boolean;
    onClick?: () => void;
    onOpened?: () => void;
    onClose?: () => void;
}
export default function Notify(options: NotifyOptions | string): void;
export {};
