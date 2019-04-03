declare type NotifyOptions = {
    text: string;
    color?: string;
    backgroundColor?: string;
    duration?: number;
    selector?: string;
    context?: any;
    safeAreaInsetTop?: boolean;
};
export default function Notify(options: NotifyOptions | string): void;
export {};
