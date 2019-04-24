interface NotifyOptions {
    text: string;
    color?: string;
    backgroundColor?: string;
    duration?: number;
    selector?: string;
    context?: any;
    safeAreaInsetTop?: boolean;
    zIndex?: number;
}
export default function Notify(options: NotifyOptions | string): void;
export {};
